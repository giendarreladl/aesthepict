import { Component, For, createEffect, createSignal, onMount } from "solid-js";


///css///
import './hasil_foto.css'
import * as am5 from '@amcharts/amcharts5/index';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import AgGridSolid, { AgGridSolidRef } from "ag-grid-solid";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { createStore } from "solid-js/store";
import { getHasilFoto } from "../service/Service";

const Foto: Component = () => {

    const [Contohft, setContohft] = createSignal([
      { id: '',judul: '', image: "" },
        
      ]);


 onMount(() => {

        getHasilFoto().then((data: any) => {
          console.log('cekhasilfoto ->', data);
          // setImG(data[4].img_client);
          const outputData = data.reduce((acc: { datas: any[]; }[], cur: any, index: number) => {
              const chunkIndex = Math.floor(index / 80);
              if (!acc[chunkIndex]) {
                  acc[chunkIndex] = { datas: [] };
              }
              acc[chunkIndex].datas.push(cur);
              return acc;
          }, []);

          // console.log("CEKKK",JSON.stringify(outputData,null,4));
          let res = JSON.stringify(outputData, null, 8)

          let a = JSON.parse(res)
          setContohft(a[0].datas)
          console.log("parse",Contohft())
      })

      
});

    
    return (
        <>
        <div class="bungkusfoto">
    <For each={Contohft()}>
            {(Foto, i) => (
              <div class="main-sc">
                 <div class="gambar"><img src={Foto.image} /></div>
              </div>
            )}
          </For>
          </div>
        </>
    )
}

export default Foto;