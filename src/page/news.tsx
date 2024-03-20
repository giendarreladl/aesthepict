import { Component, For, createEffect, createSignal, onMount } from "solid-js";


///css///
import './news.css'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { createStore } from "solid-js/store";
import { getHasilFoto } from "../service/Service";
import { A } from "@solidjs/router";
import cara from '../assets/cara.jpeg'
import camera from '../assets/camera.jpeg'
import edit from '../assets/premiere.jpeg'

const News: Component = () => {



 onMount(() => {


      
});

    
    return (
        <>
         <div class="box2">
            <section id="Skills2"></section>
           
            <div class="card2">
            <div class="gambar-news">
            <img src={cara} alt="" />
          </div>
                <i class="fa-solid fa-user"></i>
                <h5>Cara Membuat Video Cinematic</h5>
                <div class="txt2">
                    <p>berikut adalah tutorial singkat untuk membuat video cinematic !</p>
                    <p style="text-align: center;"></p>
                    <a class="button"><A href="/tutorial">Lihat Selengkapnya</A></a>
                </div>
            </div> 
            <div class="card2">
            <div class="gambar-news">
            <img src={camera} alt="" />
          </div>
                <i class="fa-solid fa-desktop"></i>
                <h5>Camera paling worth it untuk videografi</h5>
                <div class="txt2">
                    <p>Sony A6400 adalah sebuah camera mirrorles yang mudah dibawa ! </p>
                    <p style="text-align: center;"></p>
                    <a class="button"><A href="/rekomendasi">Lihat Selengkapnya</A></a>
                </div>
            </div>
            <div class="card2">
            <div class="gambar-news">
            <img src={edit} alt="" />
          </div>
                <i class="fa-solid fa-desktop"></i>
                <h5>Aplikasi Editing untuk Foto dan Video</h5>
                <div class="txt2">
                    <p>Ada 2 aplikasi yang biasa digunakan untuk editing foto dan video ! </p>
                    <p style="text-align: center;"></p>
                    <a class="button"><A href="/editing">Lihat Selengkapnya</A></a>
                </div>
            </div>
        </div>
        </>
    )
}

export default News;