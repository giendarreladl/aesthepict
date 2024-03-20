import { Component, For, createEffect, createSignal, onMount } from "solid-js";


///css///
import './tutorial.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { createStore } from "solid-js/store";
import { getHasilFoto } from "../service/Service";
import { A } from "@solidjs/router";
import camera from '../assets/camera.jpeg'
import camera2 from '../assets/6400.jpeg'

const Rekomendasi: Component = () => {



 onMount(() => {


});

    
    return (
        <>
        <div class="bungkus-gambar-news">
            <div class="gambar-tutor1">
            <img src={camera} alt="" />
          </div>
          <div class="gambar-tutor2">
            <img src={camera2} alt="" />
          </div>
          </div>
          <div class="judul-news">
            <h1>Camera Paling Worth It Untuk Videografi</h1>
            <p>Kamera Sony Alpha a6400 adalah kamera mirrorless yang sangat populer dan serbaguna yang dirancang untuk fotografi dan videografi. Karena bentuknya yang kecil maka kamera ini sangat cocok untuk dibawa kemana-mana</p>
          </div>
          <div class="isi">
            <p><span class="invisible">........</span>Sony Alpha a6400 dilengkapi dengan sensor gambar APS-C Exmor CMOS dengan resolusi 24,2 megapiksel yang memberikan gambar yang tajam dan detail.
            Kamera ini ditenagai oleh prosesor gambar BIONZ X yang memungkinkan kinerja tinggi dan pengolahan gambar yang cepat.
            Salah satu fitur unggulan dari kamera ini adalah sistem fokus otomatis (AF) yang sangat canggih. Sony a6400 menggunakan sistem AF hibrida dengan 425 titik deteksi fase dan 425 titik deteksi kontras, yang memungkinkan fokus yang cepat, akurat, dan responsif bahkan pada subjek yang bergerak cepat.</p>

            <p><span class="invisible">........</span>Kamera ini mampu mengambil gambar dalam mode burst hingga 11 frame per detik dengan fokus otomatis yang terus-menerus, membuatnya cocok untuk fotografi aksi dan olahraga.
            Sony Alpha a6400 mendukung rekaman video 4K dengan kualitas yang sangat baik. Kamera ini juga memiliki dukungan untuk perekaman video Full HD 1080p hingga 120fps untuk slow motion.
            Kamera ini dilengkapi dengan layar LCD sentuh 3 inci yang dapat diputar 180 derajat ke atas dan 90 derajat ke bawah, memungkinkan pengguna untuk mengambil foto dan merekam video dari berbagai sudut dengan mudah.</p>

            <p><span class="invisible">........</span>Sony Alpha a6400 juga dilengkapi dengan viewfinder elektronik OLED 2,36 juta titik yang memberikan pandangan yang jelas dan akurat dari gambar yang diambil.
                Kamera ini dilengkapi dengan Wi-Fi dan Bluetooth, memungkinkan pengguna untuk mentransfer foto dan video secara nirkabel ke perangkat cerdas atau mengontrol kamera dari jarak jauh melalui aplikasi Sony Imaging Edge.
                Kamera ini memiliki desain yang kompak dan ringan, membuatnya mudah dibawa ke mana-mana dan cocok untuk fotografi sehari-hari serta perjalanan.
                Sony Alpha a6400 adalah pilihan yang sangat baik bagi fotografer dan videografer yang menginginkan kamera yang serbaguna, responsif, dan menghasilkan kualitas gambar yang tinggi.
</p>
            </div>
            <div><span class="invisible">........</span></div>
        </>
    )
}

export default Rekomendasi;