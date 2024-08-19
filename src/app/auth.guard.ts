import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CommonService } from "./services/common/common.service";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let _userId = this.appService.getAppUserId;
        if (_userId == undefined || _userId == null || _userId == '') {
            this._router.navigate(['login']);
            return false;
        } else {
            return true;
        }
    }
    
    constructor(private _router: Router, private appService: CommonService) {}
}