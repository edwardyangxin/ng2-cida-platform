import {Component, OnInit, ViewEncapsulation}                     from '@angular/core';
import {DomSanitizer}                         from '@angular/platform-browser';
import {ApiService, commonConfig}             from '../../../frameworks';
import {TokenService}                         from '../../../frameworks/shared/services/token.service';
import {ErrorService}                         from "../../../frameworks/shared/services/error.service";
import {UserService}                          from "../../../frameworks/shared/services/http/user.service";
import {Router, ActivatedRoute}                 from "@angular/router";
import {CaseHomeService}                      from "../services/CaseHomeService";
import {TreeNode}                             from '../model/TreeNode';
import {TreeEntity}                           from '../model/TreeEntity';

@Component({
    moduleId: module.id,
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    leftscroll() {
        var index = $(".active").index();
        var length = $(".scrollul li").length;
        var eq = (index == length - 1) ? 0 : index + 1;//判断是不是最后一个，是返回0不是index+1
        $(".scrollul li").eq(eq).addClass("active").siblings().removeClass("active")
    }

    /**
     * 设置tree参数
     */
    tree: any;
    tmssServerList: any;
    types: string = "TestVersion,TestItem,Product,TestCase,ContainerVersion,TestProject,BaselineVersion,PhysicalTestCase,TestCaseContainer,Space,TestScene";

    fields: string = "uri,name,rmType,resourceType,type,Mark,versionPath,VersionStatus,versionType,parentPath,spaceUri,hasChildPhysicalCase,ProductLine_id,archiveStatus,IsShareBaseline,hideFeature,polymorphCombinationName,polymorphCombinationPath,polymorphCombinationUri,comment,RelatedCases,LastResult,isFeature,RelationStatus,AutoType,physicalAutoType,ExistAttachments";
    curProject: any;
    treeEntity: TreeEntity;
    projectId: string;
    tmssServerId: string;

    setting = {
        view: {
            dblClickExpand: false,
            showLine: true,
            selectedMulti: false
        },
        callback: {
            beforeClick: this.beforeClick,
            beforeCheck: this.beforeCheck,
            onClick: this.onTreeEntity,
            onCheck: this.onCheck
        },
        async: {
            enable: true,                      //设置启用异步加载
            type: "post",
            dataType: "json",                     //异步加载类型:post和get
            contentType: "application/x-www-form-urlencoded",   //定义ajax提交参数的参数类型，一般为json格式
            url: this.getChildUrl,                //定义数据请求路径
            autoParam: ["id", "name", "level"]  //定义提交时参数的名称，=号前面标识节点属性，后面标识提交时json数据中参数的名称
        }
    };

    //申明服务
    constructor(private api: ApiService, private router: Router,
                private route: ActivatedRoute, private caseHomeService: CaseHomeService) {
        api.baseUrl = `${commonConfig.cidaApiUrl}` + `${commonConfig.apiVersion}`;
    }

    //初始化
    ngOnInit() {

        this.route.params.subscribe(params => {
            this.projectId = params['projectId'];
            console.log(this.projectId);
        });

        //用来操作内容里的东西 不需要
        // $('h2').click(function () {
        //     if ($(this).siblings('li').hasClass('on')) {
        //         $(this).siblings('li').slideUp(500).removeClass('on');
        //     } else {
        //         $(this).siblings('li').slideDown(500).addClass('on');
        //     }
        // });
        //树 tree
        this.initServerTree();

        // this.leftscroll();
    }

    initServerTree() {
        this.caseHomeService.getServerByType("TMSS").subscribe(response => {
            if (response) {
                this.tmssServerList = response;
                console.log(this.tmssServerList);
                this.produceTmssTree("root",this.fields,this.types,"-1","-1",this.tmssServerList[0].id);
                // this.produceProjectAssociateTree();
            }
        });
    }

    onTreeEntity(e, treeId, treeNode) {
        let url = treeNode.data.realURI;

        $.ajax({
            url: `${commonConfig.cidaApiUrl}` + `${commonConfig.apiVersion}` + "tree/getCaseTreeEntity",
            data: {"url": url},
            cache: false,
            async: false,//表示同步方法
            type: "post",
            dataType: "json",
            scriptCharset: "utf-8",
            error: function () {
                console.log("onTreeEntity Exception!");
            },
            success: function (rs) {
                if (rs.status == "ok") {
                    var treeHtml = "";
                    let m = 0;
                    let type = "";
                    let name = "";
                    for (var prop in rs.result.value) {
                        if (m % 2 === 0) {
                            if (m === 0) {
                                treeHtml += '<tr>';
                            } else {
                                treeHtml += '</tr><tr>';
                            }
                        }
                        let value = rs.result.value[prop];
                        treeHtml += '<td bgcolor="" class="td-one">' + prop + '</td><td bgcolor="" class="td-two">' + value + '</td>';
                        if ("creationDate" === prop) {
                            $("#creationTime").html("Creation Time:" + value);
                        }
                        if ("author" === prop) {
                            $("#Author").html("Author:" + value);
                        }
                        if ("lastModified" === prop) {
                            $("#modifyTime").html("Modify Time:" + value);
                        }

                        if ("versionType" === prop) {
                            type = value;
                        }

                        if ("name" === prop) {
                            name = value;
                        }
                        m++;
                    }
                    let iconStr: string = "";
                    iconStr = "app/portal/assets/img/tree/icon-" + type + ".gif";
                    let titleStr = "<img height='20px' width='20px' src='" + iconStr + "'>" + name;

                    $("#curInfo").html(titleStr);

                    if (m > 0 && m % 2 === 0) {
                        treeHtml = treeHtml.substring(0, treeHtml.length - 3);
                    } else {
                        treeHtml += '</tr>';
                    }
                    $("#basicInfoTable").html(treeHtml);
                }
            }
        });
    }

    getChildUrl(treeId, treeNode) {
        let types: string = "TestVersion,TestItem,Product,TestCase,ContainerVersion,TestProject,BaselineVersion,PhysicalTestCase,TestCaseContainer,Space,TestScene";
        let fields: string = "uri,name,rmType,resourceType,type,Mark,versionPath,VersionStatus,versionType,parentPath,spaceUri,hasChildPhysicalCase,ProductLine_id,archiveStatus,IsShareBaseline,hideFeature,polymorphCombinationName,polymorphCombinationPath,polymorphCombinationUri,comment,RelatedCases,LastResult,isFeature,RelationStatus,AutoType,physicalAutoType,ExistAttachments";

        return `${commonConfig.cidaApiUrl}` + `${commonConfig.apiVersion}` + "/tree/getCaseEntityChildren?uri=" + treeNode.data.realURI + "&fields=" + fields + "&types=" + types + "&curPage=-1&pageSize=-1&tmssServerId=" + 77;
    }

    beforeCheck(treeId, treeNode) {
        //这里是勾选前触发所以当前状态为unchecked状态
        if (treeNode && !treeNode.checked) {
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var nodes = treeObj.getCheckedNodes(true);
            // 点击第21个节点时提示
            if (nodes.length > 19) {
                alert("You can't select more than 20 version !");
                return false;
            }
        }
    }

    onCheck(e, treeId, treeNode) {
    }

    beforeClick(treeId, treeNode, clickFlag) {
        //   console.log("beforeClick ]&nbsp;&nbsp;" + treeNode.name );
    }

    onNodeClick(event, treeId, treeNode, clickFlag) {
        var pdStr: string = "";
        for (var m = 0; m < treeNode.getPath().length; m++) {
            if (m == 0) {
                pdStr += treeNode.getPath()[m].name;
            } else {
                pdStr += "/" + treeNode.getPath()[m].name;
            }
        }

        $("#productLine").val(pdStr);
        $(".text-down-div").slideToggle();
    }


    produceTmssTree(uri, fields, types, curPage, pageSize, tmssServerId) {
        this.caseHomeService.getTmssTree("root", this.fields, this.types, "-1", "-1", this.tmssServerList[0].id).subscribe(response => {
            if (response.status && response.status === "ok") {
                let treeNodes = [];
                if (response.result.value.children && response.result.value.children.length > 0) {
                    for (let m = 0; m < response.result.value.children.length; m++) {
                        let levelChild = response.result.value.children[m];
                        if (levelChild.elementName === "Children") {
                            if (levelChild.children && levelChild.children.length > 0) {
                                for (let n = 0; n < levelChild.children.length; n++) {
                                    var node: TreeNode = new TreeNode();
                                    node.id = levelChild.children[n].uri;
                                    node.name = levelChild.children[n].name;
                                    node.icon = this.getNodeIcon(levelChild.children[n].type);
                                    node.isParent = true;
                                    node.nocheck = true;
                                    node.data = levelChild.children[n];
                                    treeNodes.push(node);
                                }
                            }
                            break;
                        }
                    }
                }
                console.log(treeNodes);
                this.tree = $.fn.zTree.init($("#caseTree"), this.setting, treeNodes);
            } else {
                console.log("failed to get tmss tree~!");
            }
        });
    }

    switchTree(treeType) {
        if (treeType === '1') {
            this.produceTmssTree("root", this.fields, this.types, "-1", "-1", "77");
        } else {
            this.produceProjectAssociateTree();
        }
    }

    getNodeIcon(type) {
        let iconStr: string = "";
        iconStr = "app/portal/assets/img/tree/icon-" + type + ".gif";
        return iconStr;
    }

    produceProjectAssociateTree() {
        this.caseHomeService.getProjectAssociatedTree(this.projectId).subscribe(response => {
            if (response.status && response.status === "success") {
                let treeNodes = [];
                if (response.data && response.data.length > 0) {
                    for (let m = 0; m < response.data.length; m++) {
                        var node: TreeNode = new TreeNode();
                        node.id = response.data[m].uri;
                        node.name = response.data[m].name;
                        node.icon = this.getNodeIcon(response.data[m].versionType);
                        node.isParent = true;
                        node.nocheck = true;
                        node.data = response.data[m];
                        treeNodes.push(node);
                    }
                }
                console.log(treeNodes);
                this.tree = $.fn.zTree.init($("#caseTree"), this.setting, treeNodes);
                this.curProject = response.CURPROJECT;
            } else {
                console.log("failed to get tmss tree~!");
            }
        });
    }


}
