
import { createSignal, type Component, onMount, For, useTransition, Suspense, Switch, Match, Show } from "solid-js";
import AgGridSolid, { AgGridSolidRef } from 'ag-grid-solid';
import foto from "../assets/huawei-logo.png"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./order.css"
import 'ag-grid-enterprise';
import { any } from "@amcharts/amcharts5/.internal/core/util/Array";
import { createStore } from "solid-js/store";
import { getAmchart, getBarang, getChart, getDokumen, getFilterDoc, getJenis, gettabelor, ordergp } from "../service/Service";
// import { XLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import { onCleanup } from 'solid-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { FiCheckCircle, FiEye } from 'solid-icons/fi'
import { VsError } from 'solid-icons/vs'

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SetFilter } from "ag-grid-enterprise";

const Orders: Component = () => {

  let gridRefTabel: AgGridSolidRef;

  const [rowLenght, setRowlength]: any = createSignal(0)
  const [tabel]: any = createStore([
    { field: 'nama', headerName: 'Nama' },
    { field: 'pilihan_order', headerName: 'Pilihan Order' },
    { field: 'jadwal_order', headerName: 'Jadwal Acara' },
    { field: 'status', headerName: 'Status' },
  ]);

  const [datatabel, setDatatabel]: any = createStore([
    // {
    //   nama: 'Ubet', order: 'Foto Rolling', tanggal: '02-06-2023', no_phone: '085723667'
    // },
    // {
    //   nama: 'Adli', order: 'Video Cinematic', tanggal: '12-07-2023', no_phone: '08588887'
    // },
    // {
    //   nama: 'Jauza', order: 'Foto Wedding', tanggal: '29-11-2023', no_phone: '0812778857'
    // },
  ]);

  const defaultColDefTabel = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
    // editable: true,
  };

  const [ulum, setUlum] = createSignal(true)
  const [email, setEmail] = createSignal()


  const ord = (evt: any) => {

    console.log('testPassword', evt.currentTarget.value)
    const passwordRegex: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log("parse", passwordRegex.test(evt.currentTarget.value));
    setUlum(passwordRegex.test(evt.currentTarget.value))
    setEmail(evt.currentTarget.value)
    if (evt.currentTarget.value === '') {
      console.log('password1')
      setUlum(true);
    } else {
      console.log('password2')
    }
  }

  onMount(() => {

    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root1 = am5.Root.new("chartdivs");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root1.setThemes([
      am5themes_Animated.new(root1)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart1: any = root1.container.children.push(am5xy.XYChart.new(root1, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));



    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor1 = chart1.set("cursor", am5xy.XYCursor.new(root1, {}));
    cursor1.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root1, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: -17
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis1 = chart1.xAxes.push(am5xy.CategoryAxis.new(root1, {
      maxDeviation: 0.3,
      categoryField: "tahun",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root1, {})
    }));

    let yAxis1 = chart1.yAxes.push(am5xy.ValueAxis.new(root1, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root1, {
        strokeOpacity: 0.1
      })
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series1 = chart1.series.push(am5xy.ColumnSeries.new(root1, {
      name: "Series 1",
      xAxis: xAxis1,
      yAxis: yAxis1,
      valueYField: "count",
      sequencedInterpolation: true,
      categoryXField: "tahun",
      tooltip: am5.Tooltip.new(root1, {
        labelText: "{valueY}"
      })
    }));

    series1.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    // series1.columns.template.adapters.add("fill", function(fill: any, target: any) {
    //   return chart1.get("colors").getIndex(series1.columns.indexOf(target));
    // });

    // series1.columns.template.adapters.add("stroke", function(stroke: any, target: any) {
    //   return chart1.get("colors").getIndex(series1.columns.indexOf(target));
    // });

    series1.set("fill", am5.color('#760305'));


    // Set data
    let data1;
    getChart().then((data: any) => {
      data1 = data
      console.log("GGG", data1)

      xAxis1.data.setAll(data1);
      series1.data.setAll(data1);


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series1.appear(1000);
      chart1.appear(1000, 100);
    })

    // definde function create store
    const [content, setContent] = createStore(
      { content1: '', content2: '' }
    );


    gettabelor().then((data: any) => {
      setDatatabel(data)
      gridRefTabel.api.setRowData(data);
    })
  });




  const [isOpen, setIsOpen] = createSignal(false);
  const [isKosong, setIsKosong] = createSignal(false);
  const [nama, setNama] = createSignal()
  const [pilihanorder, setPilih] = createSignal()
  const [nohp, setHp] = createSignal()
  const [jadwalorder, setJadwal] = createSignal()


  const Ordergien = async () => {
    setIsOpen(false);
    // setIsEror(false);
    setIsKosong(false);

    console.log('nama ->', nama());
    console.log('pilihan_order ->', pilihanorder());
    console.log('no_hp ->', nohp())
    console.log('jadwal_order ->', jadwalorder());
    if ((nama() !== undefined && nama() !== '') && (pilihanorder() !== undefined && pilihanorder() !== '') && (nohp() !== undefined && nohp() !== '') && (jadwalorder() !== undefined && jadwalorder() !== '')) {


      ordergp({ 'nama': nama(), 'pilihan_order': pilihanorder(), 'no_hp': nohp(), 'jadwal_order': jadwalorder() }).then((data: any) => {
        setIsOpen(true);
      })


    } else {
      setIsKosong(true);
    }

  }



  return (
    <>
      <div class="wadahorder">
        <div class="pertama">
          <div class="atas">
            <h1>Order Now !</h1>
          </div>
          <div class="kanankiri">

            <div class="order">
              {/* <h1>Order Now !</h1> */}
              <input type="text" placeholder="Name" onchange={(a => { setNama(a.currentTarget.value) })} />

              <input type="text" placeholder="choose your order" onchange={(a => { setPilih(a.currentTarget.value) })} />
              <Show
                when={!ulum()}
              >
                <p>Isi sesuai pada daftar harga</p>
              </Show>
            </div>

            <div class="orders">
              <input type="text" placeholder="No. Phone" onchange={(a => { setHp(a.currentTarget.value) })} />
              <input type="date" placeholder="Date" onchange={(a => { setJadwal(a.currentTarget.value) })} />
            </div>
          </div>

          <div class="bungkus-btn">
            <label for="my_modal_or" class="btn psx-11" onClick={Ordergien} >Order</label>
          </div>
        </div>
        <input type="checkbox" id="my_modal_or" class="modal-toggle" />

        {isOpen() && (
          <div class="modal">

            <div class="modal-box" >
              <label class="modal-backdrop2" for="my_modal_or">Close</label>
              <div class='ceklis' style="font-size:50px;"><FiCheckCircle /></div>
              <label class='sukses'>order successfully</label>
            </div>

          </div>


        )}


        {isKosong() && (
          <div class="modal">
            <div class="modal-box" >
              <label class="modal-backdrop2" for="my_modal_or">Close</label>
              <div class='eror' style="font-size:50px;color:red;"><VsError /></div>
              <label class='sc2'>Please fill in all data</label>
            </div>
          </div>
        )}



        <div class="textdata">
          <h1>Data Order</h1>
        </div>
        <div class="kedua">
          <div class="kedua-kiri">
            <div id="chartdivs" class="chartdarel" style="padding-top: 3%;width: 100%;height: 290px;"></div>
          </div>
          <div class="kedua-kanan">
            <h1>Daftar</h1>
            <div class="ag-theme-alpine" style="width:95%;height:250px;margin-left:1vw;">
              <AgGridSolid
                columnDefs={tabel}
                rowData={datatabel}
                defaultColDef={defaultColDefTabel}
                ref={gridRefTabel!}
                paginationAutoPageSize={true}
                pagination={true}
              />
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default Orders;

