import type { Component } from 'solid-js';

import logo from './logo.svg';

import "virtual:uno.css"
import { style } from 'solid-js/web';
import { Routes, Route, Router, A, useLocation, useNavigate } from '@solidjs/router';
import { Show, createEffect, createMemo, createSignal, lazy, onMount } from 'solid-js';
import 'ag-grid-enterprise';
import "./page/order.css"
import "./page/hasil_video.css"
import "./page/hasil_foto.css"
import "./page/profile.css"

import { useParams } from "@solidjs/router";
import { getAuth } from './service/Service';
import Video from './page/hasil_video';
import Foto from './page/hasil_foto';
import Profile from './page/profile';
import { AiOutlineMenu } from 'solid-icons/ai'
import { FiLogIn } from 'solid-icons/fi'

import Bea from '../src/assets/picts.png'
import PP from '../public/dhafin.jpg'
import Logns from './page/profile';
import Harga from './page/daftar_harga';
import Orders from './page/order';


const DocPabean = lazy(() => import('./page/order'))
const logn = lazy(() => import('./auth/login'))
const Dashboard = lazy(() => import('./page/dashboard'))
const harga = lazy(() => import('./page/daftar_harga'))
const Fotoo = lazy(() => import('./page/hasil_foto'))



const App: Component = () => {

  const [seconds, setSeconds] = createSignal(0);
  const [dataAuth, setDataAuth] = createSignal({ 'token': '', 'id': '' });


  // Function to update the seconds signal every second
  const updateSeconds = () => {
    console.log("TEST ")
    const authData = localStorage.getItem('auth');
    if (authData !== null) {
      // Now TypeScript knows that authData is a string 
      console.log('auth cek', JSON.parse(authData).id);
      setDataAuth({"id": JSON.parse(authData).id, "token": JSON.parse(authData).token})

    } else {
      // Handle the case when the item is not present in localStorage
      console.log('No authentication data found.');
    }


    // setSeconds((prevSeconds) => prevSeconds + 1);
  };



  const token = sessionStorage.getItem('token');

  createEffect(() => {
  })

  const navigate = useNavigate();
  const dataY: any = () => {

    sessionStorage.removeItem('token');
    navigate('/', { replace: true });
    console.log('token is required -> ', token)




  }



  // const location = useLocation();
  const location = useLocation();
  // const pathname = createMemo(() => location.pathname);
  const [routeCek, setRouteCek] = createSignal(false)

  onMount(() => {
    console.log(window.location.href);

    // console.log("The count is now", window.location.pathname);
    localStorage.setItem('cek', 'false')
    console.log("GGwp -> ", localStorage.getItem('cek',))
  })

  return (
    <div>
      <Show
        when={!routeCek()}
      >
        <div class="navbar bg-base-100" style="box-shadow:0px 0px 3px black;">
          <div class="flex-1">
            <img src={Bea} />
            <h1 class="navatas">GIEN PICTURES</h1>
            <h1 class="navbawah">Cinematic & Fotografi</h1>
            <div class="btnnav">
              <button class="btn btn-xs" style="margin-left:20%;" ><A href="/dashboard" >Dashboard</A></button></div>
            <label for="my-drawer" class="btn btn-xs" style="margin-left:0%">Menu</label>
          </div>

          <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btnprofile btn-ghost btn-circle avatar">
                <div class='menuu'><AiOutlineMenu />
                </div>
              </label>
              <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                  <label for="my_modal_9"><a class="justify-between">Login / Register</a></label>
                </li>
                <div class='btnlog'>
                  <label for="my_modal_5" class="btn">Logout</label></div>
              </ul>
              <input type="checkbox" id="my_modal_5" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box">
                  <p class="apa" style="font-size: 20px; font-weight:400;">Apakah anda yakin ingin keluar?</p>
                  <div class="modal-action">
                    <label for="my_modal_5" class="btn" style="background-color:#FF0000; border:none;color:black" onclick={dataY}>YA</label>
                    {/* <button class="btntdk btn-sm btn-circle btn-ghost absolute right-2 top-2" style="background-color:none; border:none;">✕</button> */}
                    <label for="my_modal_5" class="btn" style="color:black">Close!</label>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* ////////////////////////////////////////////LOGINNNNNNs//////////////////////////////// */}

          <div>
          <input type="checkbox" id="my_modal_9" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box-log">
                    <Logns/>
                    {/* <button class="btntdk btn-sm btn-circle btn-ghost absolute right-2 top-2" style="background-color:none; border:none;">✕</button> */}
                </div>
                <label class="close" for="my_modal_9">✘</label>
              </div>
          </div>

{/* ////////////////////////////////////////////EDIT TABLE//////////////////////////////// */}

          {/* <div>
          <input type="checkbox" id="my_modaledit" class="modal-toggle" />
              <div class="modal">
                <div class="modal-box-log">
                 <ModalEdit/>
                </div>
                <label class="close" for="my_modaledit">✘</label>
              </div>
          </div> */}


        </div>

      </Show>



      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <Routes>
            <Route path='/' component={Dashboard} />
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/order' component={DocPabean} />
            <Route path='/daftar-harga' component={harga} />
            <Route path='/hasil-foto' component={Fotoo} />
          </Routes>
          {/* <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label> */}
        </div>
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay"></label>
          <ul class="ander menu p-4 w-80 h-160 bg-base-200 text-base-content">
            <li><label for="my_modal_9"><a class="menuside">Login / Register</a></label></li>
            <li><label for="my_modal_9">Book / Order Here !</label></li>
            <li><A href="/daftar-harga" >Daftar Harga</A></li>
            <li><A href="/hasil-foto">Hasil Fotografi</A></li>
            <li><A href="https://drive.google.com/drive/folders/10udO5QH_jaZr0nllCd88m8PUQjbaDYZ7?usp=sharing">Hasil Videografi</A></li>

          </ul>

        </div>
      </div>
      </div>



  )
}

export default App;
