import img1 from "../../assets/images/01.jpeg";
import img2 from "../../assets/images/02.jpg";
import img3 from "../../assets/images/03.jpg";
import img4 from "../../assets/images/04.jpg";
import img5 from "../../assets/images/05.jpeg";
import img6 from "../../assets/images/06.webp";
import img7 from "../../assets/images/07.webp";
import img8 from "../../assets/images/08.jpeg";
import img9 from "../../assets/images/09.jpg";
import img10 from "../../assets/images/10.jpeg";

function getRandomImage() {
    const imgs = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
    return imgs[Math.floor(Math.random() * imgs.length)];
}

export default getRandomImage;
