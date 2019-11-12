import img1 from '../static/images/image.jpg';
import def from '../static/images/default.png';
import img2 from '../static/images/pie.png';

const list = {
	'image.jpg': img1,
	'default.png': def,
	'pie.png': img2,
};

export function giveMeImage(imageName) {
	if (!(imageName in list)) { return false; }
	return list[imageName];
}