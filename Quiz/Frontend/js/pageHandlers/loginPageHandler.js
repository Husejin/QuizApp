import registerLoginHandler, {checkLoggedAdminStatus} from "../pageServices/loginService.js";
import {initBackButtonClient} from "../utilityServices/commonService.js";


checkLoggedAdminStatus();
initBackButtonClient();
registerLoginHandler();