import { createSignal, type Component, onMount, For, useTransition, Suspense, Switch, Match } from "solid-js";
import AgGridSolid, { AgGridSolidRef } from 'ag-grid-solid';
import foto from "../assets/huawei-logo.png"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./daftar_harga.css"
import 'ag-grid-enterprise';
import { any } from "@amcharts/amcharts5/.internal/core/util/Array";
import { createStore } from "solid-js/store";
import { getBarang, getDokumen, getFilterDoc, getHarga, getJenis } from "../service/Service";
// import { XLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Harga: Component = () => {

  let gridRefHarga: AgGridSolidRef;

  const [rowLenght, setRowlength]: any = createSignal(0)
  const [Dharga]: any = createStore([
    { field: 'pilihan', headerName: 'Pilihan' },
    { field: 'pilihan_harga', headerName: 'Price / Harga' },
  ]);

  const [daftarharga, setDaftarHarga]: any = createStore([
    // {
    //   pilihan: 'Ubet', price_harga: 'Rp.300.000'
    // },
    // {
    //   pilihan: 'Adli', price_harga: 'Rp.300.000'
    // },
    // {
    //   pilihan: 'Jauza', price_harga: 'Rp.300.000'
    // },
    // {
    //   pilihan: 'Jauza', price_harga: 'Rp.300.000'
    // },
    // {
    //   pilihan: 'Jauza', price_harga: 'Rp.300.000'
    // },
  ]);

  const defaultColDefTabel = {
    flex: 1,
    resizable: true,
    // editable: true,
  };

  onMount(() => {
    getHarga().then((data: any) => {
      setDaftarHarga(data)
      gridRefHarga.api.setRowData(data);
    })
  });


    return (
        <>
        <div class="wadahharga">
          <h1>Daftar Harga</h1>
          <h2>Note : Harga sudah termasuk editing</h2>
         <div class="ag-theme-alpine harga" style="width:98%;height:450px;margin-left:1vw;font-size: 15px;font-family: poppins;">
              <AgGridSolid
                columnDefs={Dharga}
                rowData={daftarharga}
                defaultColDef={defaultColDefTabel}
                ref={gridRefHarga!}
                paginationAutoPageSize={true}
                pagination={true}
              />
            </div>
            </div>
        </>
    );
};
export default Harga;