import { createSignal, type Component, onMount, For, useTransition, Suspense, Switch, Match } from "solid-js";
import AgGridSolid, { AgGridSolidRef } from 'ag-grid-solid';
import "./dashboard.css"
import foto from "../assets/huawei-logo.png"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { any } from "@amcharts/amcharts5/.internal/core/util/Array";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from "@amcharts/amcharts5/xy";
import { createStore } from "solid-js/store";
import { RiBusinessLineChartLine } from 'solid-icons/ri'
import { getAmchart, getAmchartJumlah, getFilterDoc } from "../service/Service";
// import { XLSX } from 'xlsx';
import { onCleanup } from 'solid-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IoMail } from 'solid-icons/io'
import { FaBrandsInstagram } from 'solid-icons/fa'
import { FaBrandsTiktok } from 'solid-icons/fa'

import darel from '../assets/darel.png'
import fotodash from '../assets/fotodash.png'
import aesthe from '../assets/bgaes.png'
import { A } from "@solidjs/router";


const Dash: Component = () => {



  onMount(() => {


    
  })
  

  return (
    <>
      <div class="background-pdkb">
        <div class="wadahgambar">
          <img src={aesthe} alt="" />
        </div>
        <div class="wadah-about">
        <div class="about">
          <div class="gambar-about">
            <img src={darel} alt="" />
          </div>
          <div class="teksabout">
            <div class="teksatas">
              <h1>About Us</h1>
            </div>
              <div class="teksbawah">
              <h1>AesthePict adalah sebuah jasa fotografi dan videografi, 
              yang dibuat pada tahun 2021 oleh <span>Gien Darrel Adli. </span>
              Nama Aesthe Pict berasal dari nama (Aesthe) dan (pict) yang berarti photo aesthetics. Jasa ini sudah banyak dipakai oleh orang-orang terutama pada bidang otomotif, 
              tapi tidak hanya itu kita juga sering membuatkan video untuk acara" tertentu.</h1></div>
          </div>
        </div>
        </div>

        <div class="wadahdashtengah">
      <div class="teksskills">
      <h1>Project Results</h1>
     
      <div class="box">
            <section id="Skills"></section>
        
            <div class="card">
                <i class="fa-solid fa-user"></i>
                <h5>Fotografi</h5>
                <div class="txt">
                    <p>Ingin melihat hasil <strong>Foto</strong> kami ? klik button lihat selengkapnya !</p>
                    <p style="text-align: center;"></p>
                    <a class="button"><A href="/hasil-foto">Lihat Selengkapnya</A></a>
                </div>
            </div> 
            <div class="card">
                <i class="fa-solid fa-desktop"></i>
                <h5>Cinematic Video</h5>
                <div class="txt">
                    <p>Ingin melihat Hasil <strong>Video</strong> kami ? klik button lihat selengkapnya ! </p>
                    <p style="text-align: center;"></p>
                    <a class="button"><A href="https://drive.google.com/drive/folders/10udO5QH_jaZr0nllCd88m8PUQjbaDYZ7?usp=sharing" target="_blank">Lihat Selengkapnya</A></a>
                </div>
            </div>
            <div class="card">
                <i class="fa-solid fa-desktop"></i>
                <h5>Price List</h5>
                <div class="txt">
                    <p>Ingin melihat daftar <strong>Harga</strong> kami ? klik button lihat selengkapnya ! </p>
                    <p style="text-align: center;"></p>
                    <a class="button"><A href="/daftar-harga">Lihat Selengkapnya</A></a>
                </div>
            </div>
        </div>
        </div>
        


    <footer>
        <p>Aesthetic.Picture</p>
        <label for="my_modal_9"><h1>Book Now !</h1></label>
        <div class="sosial">
            <a href="https://mail.google.com/mail/" target="_blank"><IoMail /></a>
            <a href="https://instagram.com/gien.pict?igshid=YmMyMTA2M2Y=" target="_blank"><FaBrandsInstagram /></a>
            <a href="https://www.tiktok.com/@gien.pict?_t=8XLO0QlkLMP&_r=1" target="_blank"><FaBrandsTiktok /></a>
        </div>
        <p class="end">email : pictgien@gmail.com</p>
    </footer>
      </div>
        </div>



    </>
  );
};
export default Dash;