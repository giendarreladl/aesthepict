
import { createSignal, type Component, onMount, For, useTransition, Suspense, Switch, Match } from "solid-js";
import AgGridSolid, { AgGridSolidRef } from 'ag-grid-solid';
import foto from "../assets/huawei-logo.png"
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import "./doc_pabean.css"
import 'ag-grid-enterprise';
import { any } from "@amcharts/amcharts5/.internal/core/util/Array";
import { createStore } from "solid-js/store";
import { getBarang, getDokumen, getFilterDoc, getJenis } from "../service/Service";
// import { XLSX } from 'xlsx';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Laporanposisi: Component = () => {

    let gridReflaporanposisi: AgGridSolidRef;

    const [rowLenght, setRowlength]: any = createSignal(0)
    const [Laporanposisi]: any = createStore([
      { field: 'kode_barang', headerName: 'Kode Barang'},
      { field: 'jenis_dokumen' , headerName: 'Jenis Dokumen'},
      { field: 'nomor_dokumen', headerName: 'No. Dokumen' },
      { field: 'tgl_dok_dibuat', headerName: 'Tgl Dokumen Dibuat' },
      { field: 'tgl_dok_masuk' , headerName:'Tgl Dokumen Masuk'},
      { field: 'nomor_awb' , headerName:'Nomor AWB'},
      { field: 'nomor_shipment', headerName:'No. Shipment' },
      { field: 'pemasok', headerName:'Pemasok' },
      { field: 'lokasi_gudang', headerName:'Lokasi Gudang' },
      { field: 'jenis_valuta', headerName:'Jenis Valuta' },
      { field: 'kode_barang_as', headerName:'Kode barang AS' },
      { field: 'warna_barang', headerName:'Warna Barang' },
      { field: 'nilai_barang', headerName:'Nilai Barang' },
      { field: 'nomor_bukti_penerima', headerName:'No. Bukti Penerima' },
      { field: 'tanggal_penerima', headerName:'Tgl Penerima' },
      { field: 'no_order', headerName:'No. Order' },
      { field: 'nama_barang', headerName:'Nama Barang' },
      { field: 'jumlah', headerName:'Jumlah' },
      { field: 'satuan', headerName:'Satuan' },
    ]);
  
    const [dataposisibarang, setDataposisibaarang]: any = createStore([
      // {
      //   kode_barang: 'PT11-N 00493403', jenis_dokumen: 'BC 23', nomor_dokumen: '005441', tgl_dokumen_dibuat: '2023-06-08',
      //   tgl_dokumen_masuk: '2023-06-12', no_AWB_BL: '772336716212', no_shipment: '167057', pemasok: 'YUNLIN', lokasi_gudang: 'DS8', jenis_valuta: 'USD',
      // },
      // {
      //   kode_barang: 'KM2251T-BNT-10B', jenis_dokumen: 'BC 23', nomor_dokumen: '002874', tgl_dokumen_dibuat: '2023-03-21',
      //   tgl_dokumen_masuk: '2023-03-28', no_AWB_BL: 'CGSZ23030223', no_shipment: '165961', pemasok: 'KAIMEI', lokasi_gudang: 'DS8', jenis_valuta: 'USD',
      // },
      // {
      //   kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
      //   tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
      // },
      // {
      //   kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
      //   tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
      // },
      // {
      //   kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
      //   tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
      // },
      // {
      //   kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
      //   tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
      // },
      // {
      //   kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
      //   tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
      // },

    ]);

    const defaultColDef = {
      flex: 1,
      minWidth: 180,
      // editable: true,
    };

    const [tab, setTab] = createSignal(0);
    const [pending, start] = useTransition();
    const updateTab = (index: number) => () => start(() => setTab(index));

    const [search, setSearch]: any = createSignal();
  const [jenis, setJenis]: any = createSignal('all');

    const selectFilter = (evt: any) => {
        console.log('select ', evt);
        setJenis(evt);
      }

    const [Datefirst, setDatefirst]: any = createSignal()
  const [Datelast, setDatelast]: any = createSignal()
  const getFirstAndLastDates = (objectsArray: string | any[], dateProperty: string) => {
    if (!Array.isArray(objectsArray) || objectsArray.length === 0) {
      return null; // Return null if the array is empty or not valid
    }

    let firstDate = new Date(objectsArray[0][dateProperty]);
    let lastDate = new Date(objectsArray[0][dateProperty]);

    for (let i = 1; i < objectsArray.length; i++) {
      const currentDate = new Date(objectsArray[i][dateProperty]);

      if (currentDate < firstDate) {
        firstDate = currentDate;
      }

      if (currentDate > lastDate) {
        lastDate = currentDate;
      }
    }

    return { firstDate, lastDate };
  }


  const searchTest: any = (ev: any) => {
    console.log('Search', ev.currentTarget.value)
    gridReflaporanposisi.api.setQuickFilter(ev.currentTarget.value)
    // gridRefBarang.api.setQuickFilter(ev.currentTarget.value)
  }

  const filter = async () => {
    const x: any = document.getElementById("myDateFrom");
    const y: any = document.getElementById("myDateTo");
    console.log("date From->", x.value);
    console.log("date To->", y.value);
    console.log("jenis->", jenis());

    getFilterDoc(jenis(), x.value, y.value).then((data: any) => {
        console.log('FIlter DOk ->', data);
        // gridRefDokumen.api.setColumnDefs(konsultasi);
        setDataposisibaarang(data)
        setRowlength(data.length);
        gridReflaporanposisi.api.setRowData(data);
      })
    }


    




    onMount(() => {

        getJenis().then((data: any) => {
            console.log(data);
          })


        getDokumen().then((data: any) => {
            // console.log('konsul ->', data);
            // gridRefDokumen.api.setColumnDefs(konsultasi);
            setDataposisibaarang(data)
            gridReflaporanposisi.api.setRowData(data);
            console.log('tngung jwab ->', data.length);

            setRowlength(data.length);
            gridReflaporanposisi.api.setRowData(data);

      const result: any = getFirstAndLastDates(data, 'tgl_dok_dibuat');
      console.log(result.firstDate); //
      console.log(result.lastDate);  //

      const inputDatefirst = new Date(result.firstDate);
      const inputDatelast = new Date(result.lastDate);


      // Get the day, month, and year from the input date FIRST
      const dayfirst = String(inputDatefirst.getDate()).padStart(2, '0');
      const monthfirst = String(inputDatefirst.getMonth() + 1).padStart(2, '0');
      const yearfirst = inputDatefirst.getFullYear();


      const daylast = String(inputDatelast.getDate()).padStart(2, '0');
      const monthlast = String(inputDatelast.getMonth() + 1).padStart(2, '0');
      const yearlast = inputDatelast.getFullYear();

      // Create the formatted date string
      const formattedDatefirst = `${dayfirst}-${monthfirst}-${yearfirst}`;
      const formattedDatelast = `${daylast}-${monthlast}-${yearlast}`;

      console.log(formattedDatefirst); // Output: "07-01-2023"
      console.log(formattedDatelast);

      setDatefirst(formattedDatefirst)
      setDatelast(formattedDatelast)
    })
    
    });


    const downloadCsv: any = (ev: any) => {
        var todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);
        var params = {
          skipHeader: false,
          skipFooters: true,
          allColumns: true,
          onlySelected: false,
          suppressQuotes: true,
          fileName: `laporan-tanggung-jawab(${todayDate}).csv`,
          columnSeparator: ','
        };
        // var params1 = {
        //   skipHeader: false,
        //   skipFooters: true,
        //   allColumns: true,
        //   onlySelected: false,
        //   suppressQuotes: true,
        //   fileName: `barang-pabean(${todayDate}).csv`,
        //   columnSeparator: ','
        // };
    
        gridReflaporanposisi.api.exportDataAsCsv(params);
        // gridRefBarang.api.exportDataAsCsv(params1);
      }
    
    
      const [pdfCek, setPdfCek]: any = createSignal()
      const downloadExcel: any = (ev: any) => {
        var todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);
    
        const params = {
          fileName: `laporan-tanggung-jawab(${todayDate}).xlsx`,
          sheetName: 'Sheet1',
        };
    
        const exportData: any[] = [];
        const exportData1: any[] = [];
        gridReflaporanposisi.api.forEachNode((node) => {
          exportData.push(node.data);
          exportData1.push(node.data);
          // setPdfCek(node.data);
        });
        // gridRefBarang.api.forEachNode((node) => {
        //   
        // });
    
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, params.sheetName);
        XLSX.writeFile(workbook, params.fileName);
    
        const worksheet1 = XLSX.utils.json_to_sheet(exportData1);
        const workbook1 = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook1, worksheet1, params.sheetName);
        XLSX.writeFile(workbook, params.fileName);
    
      }
    
    
      const generatePDF = () => {
    
        const jsonData = [
          { name: 'John Doe', age: 30, city: 'New York' },
          { name: 'Jane Smith', age: 25, city: 'San Francisco' },
          { name: 'Bob Johnson', age: 40, city: 'Chicago' }
        ];
        const exportData: any[] = [];
        gridReflaporanposisi.api.forEachNode((node) => {
          exportData.push(node.data);
    
        });
        // setPdfCek(node.data);
    
        // Create a new PDF document
        const doc: any = new jsPDF();
    
        // Define the table headers and keys
        console.log("pdf cek -> ", pdfCek());
        const headers = [['K.Barang', 'Jenis.Dok', 'No.Dok', 'Tgl Dok Dibuat', 'Tgl Dok Masuk', 'No.Awb', 'No.Ship', 'Pemasok', 'Lok.Gudang', 'J.Valuta', 'K.Barang As', 'W.Barang', 'N.Barang', 'No.Penerima', 'Tgl.Penerima', 'No.Order', 'Nama Barang', 'Jumlah', 'Satuan']];
        const data = exportData.map((obj: any) => [obj.kode_barang, obj.jenis_dokumen, obj.nomor_dokumen, obj.tgl_dok_dibuat, obj.tgl_dok_masuk, obj.nomor_awb, obj.nomor_shipment, obj.pemasok, obj.lokasi_gudang, obj.jenis_valuta, obj.kode_barang_as, obj.warna_barang, obj.nilai_barang, obj.nomor_bukti_penerima, obj.tanggal_penerima, obj.no_order, obj.nama_barang, obj.jumlah, obj.satuan]);
    
        // Set the table style
        doc.setFontSize(3);
        doc.setTextColor(40);
        // doc.setFontStyle('bold');
    
        // Add the table to the document
        doc.autoTable({
          head: headers,
          body: data,
          startY: 20,
          theme: 'striped',
          styles: {
            cellPadding: 1.5,
            fontSize: 3,
            valign: 'middle',
            halign: 'center'
          },
          headerStyles: {
            fillColor: [2, 39, 93],
            textColor: 255,
            fontSize: 3
          }
        });
    
        // Save the document as a PDF file
    
        var todayDate = new Date().toISOString().slice(0, 10);
        doc.save(`dokumen-pabean(${todayDate}).pdf`);   
      
    };


    return (
        <>
        <div class="drawer drawer-end">

<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
<div class="drawer-content">
  <label for="my-drawer-4" class="salmon1 drawer-button btn btn-primary" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M17.5 17.5L9.25 12l8.25-5.5l-1-1.5L6 12l10.5 7z" /></svg></label>
  <div class="rawr">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />



        <div class="teks">
              <h1 class="tekstanggungjawab">LAPORAN POSISI BARANG DALAM PENGELUARAN </h1>
            </div>
            <div class="wadahtotal">
              <div class="wadahtotal1">
                <h3 class="total">Total Row</h3>
                </div>
                <div class="wadahtotal1a">
                <div class="totalrow">
                <h1>{rowLenght}</h1>
                </div>
                </div>
              <div class="wadahtotal2">
                <ul class="inline2">
                  <li classList={{ selected2: tab() === 0 }}>
                    Laporan Posisi Barang dalam Pengeluaran
                  </li>
                </ul>
              </div>
              <div class="wadahtotal3">
              <h1 class="period">Periode</h1>
              <div class="kotakfrom">
                <h1>{Datefirst}</h1>
              </div>
              <h1 class="mines">_</h1>
              <div class="kotakto">
                <h1>{Datelast}</h1>
              </div>
              </div>
            </div>


            <div class="tab" style="width: 100%, margin-top: 10%;">
                    <div class="ag-theme-alpine">
                      <AgGridSolid
                        columnDefs={Laporanposisi}
                        rowData={dataposisibarang}
                        defaultColDef={defaultColDef}
                        ref={gridReflaporanposisi!}
                        suppressExcelExport={true}
                        paginationAutoPageSize={true}
                        pagination={true}
                      />

                    </div>
            </div>
            </div>
          </div>
          <div class="drawer-side">
          <label for="my-drawer-4" class="drawer-overlay"></label>

          <ul class="salmon menu p-4 w-115 h-full bg-base-200 text-base-content">

            <div class="filter">
              <p>Filter By</p>
            </div>
            <p class="from">From </p>
            <p class="to">To </p>
            <p class="jenis">Jenis Dokumen</p>
            <div class="search">
              <input onKeyUp={(params) => searchTest(params)} type="text" placeholder=" search" class="input input-bordered input-primary w-full max-w-xs" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 15" style="
    margin-top: -34px;"><path fill="none" stroke="currentColor" d="m14.5 14.5l-4-4m-4 2a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z" /></svg>
            </div>
            <div class="sub">
              <input type="date" id="myDateFrom" />
            </div>
            <div class="bus">
              <input type="date" id="myDateTo" />
            </div>
            <select class="select select-primary w-full max-w-xs" onChange={(e: any) => {
              console.log("GGG", e.currentTarget.value);
              selectFilter(e.currentTarget.value);
            }}>
              <option value="all">All</option>
              <For each={search()}>{(sc, i) =>
                <option >{sc.jenis_dokumen}</option>
              }</For>

            </select>
            <div class="primari">
              <button class="btn btn-warning" onClick={filter}>apply filter</button>
            </div>
            <div class="export">
              <p>Export to</p>
            </div>
            <div class="tombl">
              <button class="btn" onClick={downloadCsv}>CSV</button>
            </div>
            <div class="exc">
              <button class="btn" onClick={downloadExcel}>EXC</button>
            </div>
            <div class="pdf">
              <button class="btn" onClick={generatePDF}>PDF</button>
            </div>
          </ul>
        </div>

        </div>
        </>
    );
};
export default Laporanposisi;