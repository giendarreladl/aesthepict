import { createSignal, type Component, onMount, For, useTransition, Suspense, Switch, Match } from "solid-js";
import AgGridSolid, { AgGridSolidRef } from 'ag-grid-solid';
import foto from "../assets/huawei-logo.png"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./daftar_harga.css"
import 'ag-grid-enterprise';
import { any } from "@amcharts/amcharts5/.internal/core/util/Array";
import { createStore } from "solid-js/store";
import { getBarang, getChart, getDokumen, getFilterDoc, getHarga, getJenis, gettabelor, ordergp } from "../service/Service";
// import { XLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { A } from "@solidjs/router";
import rek from '../assets/rekening.jpg'
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { FiCheckCircle } from "solid-icons/fi";
import { VsError } from "solid-icons/vs";

const Harga: Component = () => {

  let gridRefHarga: AgGridSolidRef;

  const [rowLenght1, setRowlength1]: any = createSignal(0)
  const [Dharga]: any = createStore([
    { field: 'pilihan', headerName: 'Pilihan', checkboxSelection: true },
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

  const defaultColDefTabel1 = {
    flex: 1,
    resizable: true,
    // editable: true,
  };

  let gridRefTabel: AgGridSolidRef;

  const [rowLenght2, setRowlength2]: any = createSignal(0)
  const [tabel]: any = createStore([
    { field: 'nama', headerName: 'Nama'},
    { field: 'jadwal_order', headerName: 'Jadwal Acara' },
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

  const defaultColDefTabel2 = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
    // editable: true,
    checkbox: true,
  };


  onMount(() => {
    getHarga().then((data: any) => {
      setDaftarHarga(data)
      gridRefHarga.api.setRowData(data);
    })

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

    series1.set("fill", am5.color('#00476d'));


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

      gettabelor().then((data: any) => {
        setDatatabel(data)
        gridRefTabel.api.setRowData(data);
      })
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

  const [pilihan_harga, setPilihan]: any = createSignal()
  const [pilihan, setPilih]: any = createSignal()
  const [disabled, setDisabled]: any = createSignal()
  const [id, setId]: any = createSignal()
  const [tab, setTab] = createSignal(0);
  const [nama, setNama] : any = createSignal()
  const [nohp, setHp] : any= createSignal()
  const [jadwalorder, setJadwal] : any = createSignal()
  const [isOpen, setIsOpen] = createSignal(false);
  const [isOpenpmb, setIsOpenpmb] = createSignal(false);
  const [isKosong, setIsKosong] = createSignal(false);
   const [pending, start] = useTransition();
  const updateTab = (index: any) => () => start(() => setTab(index));


  const onSelectionChangedd = () => {
    localStorage.setItem('order', JSON.stringify(gridRefHarga.api.getSelectedRows()))
    console.log("localStorage.getItem('order') ->", localStorage.getItem('order'))
    setPilihan(gridRefHarga.api.getSelectedRows()[0].pilihan_harga)
    setPilih(gridRefHarga.api.getSelectedRows()[0].pilihan)
    setId(gridRefHarga.api.getSelectedRows()[0].id)

  }

  const searchTabel: any = (ev: any) => {
    // console.log('Search Tabel', ev.currentTarget.value)
    gridRefHarga.api.setQuickFilter(ev.currentTarget.value)
  }

  const handleDisable = () => {
    setDisabled(true);
  };

  const Ordergien = async () => {
    setIsOpen(false);
    // setIsEror(false);
    setIsKosong(false);
    

    console.log('nama ->', nama());
    console.log('no_hp ->', nohp())
    console.log('jadwal_order ->', jadwalorder());
    if ((nama() !== undefined && nama() !== '') && (nohp() !== undefined && nohp() !== '') && (jadwalorder() !== undefined && jadwalorder() !== '')) {


      ordergp({ 'nama': nama(), 'no_hp': nohp(), 'jadwal_order': jadwalorder() }).then((data: any) => {
        setIsOpen(true);
        gettabelor().then((data: any) => {
          setDatatabel(data)
          gridRefTabel.api.setRowData(data);
        })
      })


    } else {
      setIsKosong(true);
    }

  }

  

  return (
    <>
      <div class="wadahharga">
        <h1>Daftar Harga</h1>
        <div class="wadahcari">
          <input onKeyUp={(params) => searchTabel(params)} type="text" placeholder="search" class="search" /></div>
        <div class="ag-theme-alpine harga" style="width:98%;height:450px;margin-left:1vw;font-size: 15px;font-family: poppins;">
          <AgGridSolid
            columnDefs={Dharga}
            rowData={daftarharga}
            defaultColDef={defaultColDefTabel1}
            ref={gridRefHarga!}
            paginationAutoPageSize={true}
            onSelectionChanged={onSelectionChangedd}
            pagination={true}
          />
        </div>
      </div>
      <div class="wadahebuton">
        <button class="btndh"><label for="my_modal_bayar">Order Now!</label></button>
      </div>
      <input type="checkbox" id="my_modal_bayar" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">

        <input type="checkbox" id="my_modal_or" class="modal-toggle" />
        {isOpen() && (
          <div class="modal" style="--tw-bg-opacity: -0.6 !important;">

            <div class="modal-box" style="width:80% !important; background-color:rgb(214, 214, 214);">
              <label class="modal-backdrop2" for="my_modal_or">Close</label>
              <div class='ceklis' style="font-size:50px;"><FiCheckCircle /></div>
              <div class='sukses'>successfully</div>
            </div>

          </div>
        )}


        {isKosong() && (
          <div class="modal" style="--tw-bg-opacity: -0.6 !important;">
            <div class="modal-box"  style="width:80% !important; background-color:rgb(214, 214, 214);" >
              <label class="modal-backdrop2" for="my_modal_or">Close</label>
              <div class='eror' style="font-size:50px;color:red;"><VsError /></div>
              <label class='sc2'>Please fill in all data</label>
            </div>
          </div>
        )}
          <div class="inputbyr">
            <h1>Lengkapi Data Pemesanan</h1>
        <input type="text" placeholder="Nama" onchange={(a => { setNama(a.currentTarget.value) })} />
        <input type="text" placeholder="No.WhatsApp" onchange={(a => { setHp(a.currentTarget.value) })} />
        <p>Tanggal Pemotretan</p>
        <input type="date" placeholder="Date" onchange={(a => { setJadwal(a.currentTarget.value) })} />
        </div>
          <p class="apa">
            <input type="text" style="width:100%;" disabled={disabled} placeholder="" value={pilihan()} onchange={(a => { setPilih(a.currentTarget.value) })} />
          </p>
          <input type="text" class="totalharga" disabled={disabled} placeholder="" value={pilihan_harga()} onchange={(a => { setPilihan(a.currentTarget.value) })} />
          <div class="rekening">
            <img src={rek} alt="" />
          </div>
          <label class="form-control w-full max-w-xs">
            <div class="labelin">
              <span class="label-text">Masukan Bukti Pembayaran</span>
            </div>
            <input type="file" class="file-input file-input-bordered file-input-info w-full max-w-xs" style="color:black;margin-bottom: 10px;" />
          </label>
          <div class="modal-action">
            <label for="my_modal_or" class="btn" style="color: #white; background :#1a8ecc;" onClick={Ordergien} >Submit</label>
            {/* <button class="btntdk btn-sm btn-circle btn-ghost absolute right-2 top-2" style="background-color:none; border:none;">✕</button> */}
            <label for="my_modal_bayar" class="btn" style="color:black">Close!</label>
          </div>
         
        </div>
      </div>


      <div class="textdata">
          <h1>Data Order</h1>
        </div>
        <div class="kedua">
          <div class="kedua-kiri">
            <div id="chartdivs" class="chartdarel" style="padding-top: 3%;width: 100%;height: 290px;"></div>
          </div>
          
          <div class="kedua-kanan">
          <div class="wadahbtnedit">
            <div class="kiwe">
            <h1>Daftar</h1>
            </div>
            <div class="tengen">
            </div>
            </div>
            <div class="ag-theme-alpine" style="width:95%;height:250px;margin-left:1vw;">
              <AgGridSolid
                columnDefs={tabel}
                rowData={datatabel}
                defaultColDef={defaultColDefTabel2}
                ref={gridRefTabel!}
                paginationAutoPageSize={true}
                pagination={true}
              />
            </div>
          </div>
        </div>


    </>
  );
};
export default Harga;