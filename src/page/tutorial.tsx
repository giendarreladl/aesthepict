import { Component, For, createEffect, createSignal, onMount } from "solid-js";


///css///
import './tutorial.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { createStore } from "solid-js/store";
import { getHasilFoto } from "../service/Service";
import { A } from "@solidjs/router";
import cara from '../assets/cara.jpeg'
import ytta from '../assets/kamera.jpg'

const Tutorial: Component = () => {



 onMount(() => {


      
});

    
    return (
        <>
        <div class="bungkus-gambar-news">
            <div class="gambar-tutor1">
            <img src={cara} alt="" />
          </div>
          <div class="gambar-tutor2">
            <img src={ytta} alt="" />
          </div>
          </div>
          <div class="judul-news">
            <h1>Cara Membuat Video Cinematic</h1>
            <p>Membuat video cinematic melibatkan beberapa langkah dan teknik yang dapat meningkatkan kualitas visual dan estetika dari video Anda. Berikut adalah langkah-langkah umum untuk membuat video cinematic:</p>
          </div>
          <div class="isi">
            <p><span class="invisible">........</span>Pertama Tentukan konsep dan cerita yang ingin Anda sampaikan melalui video Anda. Pastikan Anda memiliki narasi yang kuat dan menarik untuk disampaikan kepada penonton.
                Penyusunan Shot List. Buat daftar tembakan atau shot list yang mencakup jenis-jenis adegan yang ingin Anda tangkap. Ini termasuk tipe pengambilan gambar seperti wide shots, medium shots, close-ups, dan lainnya.
                Cari lokasi yang sesuai dengan cerita Anda dan memiliki potensi visual yang kuat. Pastikan untuk memperhatikan pencahayaan dan latar belakang yang sesuai dengan estetika yang Anda inginkan.</p>
            <p><span class="invisible">........</span>Pemilihan Kamera dan Pengaturan Kamera: Gunakan kamera dengan kualitas yang baik untuk menghasilkan gambar yang tajam dan jernih. Atur pengaturan kamera secara manual untuk mendapatkan kontrol penuh atas eksposur, fokus, dan kecepatan rana.
                Pencahayaan adalah kunci dalam menciptakan suasana dan nuansa dalam video cinematic. Gunakan pencahayaan yang tepat, seperti cahaya alami atau lampu studio, untuk menciptakan bayangan dan sorotan yang menarik.   
                Pilih lensa yang sesuai dengan kebutuhan visual Anda. Lensa wide-angle cocok untuk menangkap lanskap dan gambar luas, sedangkan lensa prime dengan aperture lebar cocok untuk mendapatkan efek bokeh dan fokus yang dalam.
                Pastikan gambar tetap stabil dengan menggunakan tripod, gimbal, atau teknologi stabilisasi dalam kamera atau perangkat lunak editing.</p>

                <p><span class="invisible">........</span>Gunakan perangkat lunak pengeditan video seperti Adobe Premiere Pro, Final Cut Pro, atau DaVinci Resolve untuk mengedit dan mengolah footage Anda. Atur potongan-potongan adegan secara kronologis sesuai dengan cerita yang ingin Anda sampaikan. Sesuaikan warna, kontras, dan saturasi untuk mencapai estetika visual yang diinginkan.
                    Pilih musik dan efek suara yang cocok dengan mood dan nuansa dari video Anda. Pastikan audio bersih dan seimbang dengan tingkat volume yang sesuai.
                    Pilih rasio aspek yang sesuai dengan kebutuhan Anda, misalnya 16:9 untuk video standar atau 2.39:1 untuk format layar lebar yang lebih sinematik.
                    Lakukan proses colour grading untuk meningkatkan kualitas visual dan konsistensi warna dalam video Anda. Colour grading dapat membantu menciptakan suasana dan mood yang diinginkan.Setelah proses editing selesai, render video Anda dengan pengaturan yang sesuai dan ekspor ke format yang tepat sesuai kebutuhan distribusi.</p>
            </div>
            <div><span class="invisible">........</span></div>
        </>
    )
}

export default Tutorial;