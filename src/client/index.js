import { location } from "./js/app";
//Event Listener to show resulsts

import './styles/styles.scss';
import './styles/footer.scss';
import './styles/responsive.scss';
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#btn-add').addEventListener('click', location);
});
export {
    location
}