import { Component, For, createEffect, createSignal, onMount } from "solid-js";


///css///
import './tutorial.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { createStore } from "solid-js/store";
import { getHasilFoto } from "../service/Service";
import { A } from "@solidjs/router";
import edit from '../assets/pr.jpeg'
import edit2 from '../assets/pr3.jpeg'

const Editing: Component = () => {



 onMount(() => {


      
});

    
    return (
        <>
        <div class="bungkus-gambar-news">
            <div class="gambar-tutor1">
            <img src={edit} alt="" />
          </div>
          <div class="gambar-tutor2">
            <img src={edit2} alt="" />
          </div>
          </div>
          <div class="judul-news">
            <h1>Aplikasi Editing untuk Foto dan Video</h1>
            <p>Premiere Pro dan Lightroom adalah dua produk perangkat lunak yang dikembangkan oleh Adobe, yang sangat populer di kalangan fotografer dan pembuat video profesional. </p>
          </div>
          <div class="isi">
            <p><span class="invisible">........</span>Adobe Premiere Pro adalah aplikasi penyuntingan video profesional yang digunakan untuk membuat, mengedit, dan menyusun video. Ini adalah salah satu perangkat lunak penyuntingan video yang paling banyak digunakan di industri film, televisi, dan media digital.
            Premiere Pro menawarkan berbagai fitur termasuk alur kerja yang fleksibel, pengeditan non-linear, efek visual dan transisi, pemrosesan warna, penyelarasan suara, serta integrasi yang kuat dengan aplikasi Adobe Creative Cloud lainnya seperti After Effects, Audition, dan Photoshop.
            Premiere Pro memungkinkan pengguna untuk membuat video berkualitas tinggi dengan berbagai tingkat kompleksitas, mulai dari proyek sederhana hingga produksi film layar lebar.</p>

            <p><span class="invisible">........</span>Adobe Lightroom adalah aplikasi manajemen dan penyuntingan foto yang dirancang khusus untuk fotografer. Lightroom menyediakan alat-alat yang kuat untuk mengatur, mengedit, dan memperbaiki foto secara efisien.
            Lightroom menawarkan kemampuan manajemen katalog yang kuat, yang memungkinkan pengguna untuk mengatur ribuan gambar dengan mudah dan cepat. Ini juga memiliki fitur pencarian yang canggih, yang memungkinkan pengguna untuk dengan mudah menemukan foto berdasarkan metadata, kata kunci, atau atribut lainnya.
            Dalam hal penyuntingan, Lightroom menyediakan berbagai alat yang dapat disesuaikan untuk mengatur warna, kontras, kecerahan, dan banyak lagi. Lightroom juga memiliki fitur penyuntingan batch yang memungkinkan pengguna untuk menerapkan pengaturan yang sama pada beberapa foto sekaligus.</p>

            <p><span class="invisible">........</span>Kedua aplikasi ini sangat populer di kalangan profesional dan hobbi karena kemampuan mereka dalam menyediakan alat-alat yang kuat dan efisien untuk mengelola dan menyunting foto dan video. Karena aplikasi ini adalah aplikasi yang paling mudah dan lengkap fitur nya untuk saat ini</p>
            </div>
            <div><span class="invisible">........</span></div>
        </>
    )
}

export default Editing;