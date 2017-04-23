import { Injectable }               from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Response }                 from '@angular/http';
import { Observable }               from 'rxjs';
import { ApiService }               from "../../../frameworks/shared/services/http/api.service"
import { TokenService }             from "../../../frameworks/shared/services/token.service";
import {UserService}                from "../../../frameworks/shared/services/http/user.service";


@Injectable()
export class CaseHomeService{

    public caseTree : any;

    constructor(private api: ApiService, private token: TokenService,private userService: UserService) { }

    /** find the project list by server type. */
    getServerByType(params): Observable<any>{
        return this.userService.me().mergeMap(user =>{
            return this.api.get("/project/getServerByType",
            {search: {"type":params},header:{"x-user-name": user.id}}).map(function(res: Response){
                return res.json();
            })
        });
    }

    /**search TMSS TREEE */
    getTmssTree(uri,fields,types,curPage,pageSize,tmssServerId) : Observable<any>{
        return this.userService.me().mergeMap(user =>{
            return this.api.get("/tree/getTmssTree",
            {search: {uri:uri,fields:fields,types:types,curPage:curPage,pageSize:pageSize,tmssServerId:tmssServerId},header:{"x-user-name": user.id,"Content-Type":"application/x-www-form-urlencoded"}}).map(function(res: Response){
            //console.log(res.json());
            return res.json();
            })
        });
    }

    /**获取菜单信息，展示在右侧 */
    getTreeEntity(url) : Observable<any>{
        return this.userService.me().mergeMap(user =>{
            return this.api.get("/tree/getCaseTreeEntity",
            {search: {url:url},header:{"x-user-name": user.id}}).map(function(res: Response){
                //console.log(res.json());
                return res.json();
            })
        });
    }

    /**获取项目关联的版本tree */
    getProjectAssociatedTree(projectId) : Observable<any>{
      return this.userService.me().mergeMap(user =>{
        return this.api.get("/tree/getProjectTestCaseTree",
          {search: {projectId:projectId},header:{"x-user-name": user.id}}).map(function(res: Response){
          //console.log(res.json());
          return res.json();
        })
      });
    }

}
