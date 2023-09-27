import { Component, createSignal, onMount } from "solid-js";


///css///
import './modal.css'
import * as am5 from '@amcharts/amcharts5/index';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import AgGridSolid, { AgGridSolidRef } from "ag-grid-solid";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { createStore } from "solid-js/store";

const Modal: Component = () => {

    let gridRefTabel: AgGridSolidRef;

    const [rowLenght, setRowlength]: any = createSignal(0)
    const [tabel]: any = createStore([
        { field: 'nomor_dokumen', headerName: 'Nomor Dokumen' },
        { field: 'tgl_dok_dibuat', headerName: 'Tanggal Dokumen Dibuat' },
        { field: 'kode_barang', headerName: 'Kode Barang' },
        { field: 'jenis_dokumen', headerName: 'Jenis Dokumen' },
        { field: 'nilai_barang', headerName: 'Nilai Barang' },
        { field: 'lokasi_gudang', headerName: 'Lokasi Gudang' },
        { field: 'lokasi_gudang', headerName: 'Lokasi BIN' },
        { field: 'nomor_awb', headerName: 'Keterangan' },
    ]);

    const [datatabel, setDatatabel]: any = createStore([
        {
            kode_barang: 'PT11-N 00493403', jenis_dokumen: 'BC 23', nomor_dokumen: '005441', tgl_dokumen_dibuat: '2023-06-08',
            tgl_dokumen_masuk: '2023-06-12', no_AWB_BL: '772336716212', no_shipment: '167057', pemasok: 'YUNLIN', lokasi_gudang: 'DS8', jenis_valuta: 'USD',
        },
        {
            kode_barang: 'KM2251T-BNT-10B', jenis_dokumen: 'BC 23', nomor_dokumen: '002874', tgl_dokumen_dibuat: '2023-03-21',
            tgl_dokumen_masuk: '2023-03-28', no_AWB_BL: 'CGSZ23030223', no_shipment: '165961', pemasok: 'KAIMEI', lokasi_gudang: 'DS8', jenis_valuta: 'USD',
        },
        {
            kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
            tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
        },
        {
            kode_barang: 'BOXFLAP EPFF 17', jenis_dokumen: 'BC 40', nomor_dokumen: '026035', tgl_dokumen_dibuat: '2023-05-08',
            tgl_dokumen_masuk: '2023-05-09', no_AWB_BL: 'SJ#2134/SMA', no_shipment: '166610', pemasok: 'MAKMUR', lokasi_gudang: 'DS8', jenis_valuta: 'Rp',
        },

    ]);

    const defaultColDefTabel = {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
        // editable: true,
    };

    const [isModal, setIsModal] = createSignal(false);
    
  


    onMount(() => {

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root = am5.Root.new("chartdiv90");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
        xRenderer.labels.template.setAll({
            rotation: 0,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer.grid.template.setAll({
            location: 1
        })

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            })
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        // series.columns.template.adapters.add("fill", function(fill, target) {
        //   return chart.get("colors").getIndex(series.columns.indexOf(target));
        // });

        // series.columns.template.adapters.add("stroke", function(stroke, target) {
        //   return chart.get("colors").getIndex(series.columns.indexOf(target));
        // });


        // Set data
        let data = [{
            country: "USA",
            value: 2025
        }, {
            country: "China",
            value: 1882
        }, {
            country: "Japan",
            value: 1809
        }, {
            country: "Germany",
            value: 1322
        }, {
            country: "UK",
            value: 1122
        },];

        xAxis.data.setAll(data);
        series.data.setAll(data);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);


        //////////////////////////////////////////////////chart2///////////////////////////////////////////////

        /* Chart code */
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        let root2 = am5.Root.new("chartdiv95");


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root2.setThemes([
            am5themes_Animated.new(root2)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart2 = root2.container.children.push(am5xy.XYChart.new(root2, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor2 = chart2.set("cursor", am5xy.XYCursor.new(root2, {}));
        cursor2.lineY.set("visible", false);


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer2 = am5xy.AxisRendererX.new(root2, { minGridDistance: 30 });
        xRenderer2.labels.template.setAll({
            rotation: 0,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
        });

        xRenderer2.grid.template.setAll({
            location: 1
        })

        let xAxis2 = chart2.xAxes.push(am5xy.CategoryAxis.new(root2, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer2,
            tooltip: am5.Tooltip.new(root2, {})
        }));

        let yAxis2 = chart2.yAxes.push(am5xy.ValueAxis.new(root2, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root2, {
                strokeOpacity: 0.1
            })
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series2 = chart2.series.push(am5xy.ColumnSeries.new(root2, {
            name: "Series 1",
            xAxis: xAxis2,
            yAxis: yAxis2,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series2.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        // series.columns.template.adapters.add("fill", function(fill, target) {
        //   return chart.get("colors").getIndex(series.columns.indexOf(target));
        // });

        // series.columns.template.adapters.add("stroke", function(stroke, target) {
        //   return chart.get("colors").getIndex(series.columns.indexOf(target));
        // });


        // Set data
        let data2 = [{
            country: "USA",
            value: 2025
        }, {
            country: "China",
            value: 1882
        }, {
            country: "Japan",
            value: 1809
        }, {
            country: "Germany",
            value: 1322
        }, {
            country: "UK",
            value: 1122
        },];

        xAxis2.data.setAll(data2);
        series2.data.setAll(data2);


        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series2.appear(1000);
        chart2.appear(1000, 100);


    })

    return (
        <>
        <div class="background-modal">
            <div class="showmodal">
                <div class="main-modal1">
                    <div class='modal-chart1' id="chartdiv90">
                    <h1>Top 3 Barang</h1>
                    </div>
                </div>
                <div class="main-modal2">
                    <div class='modal-chart2' id="chartdiv95">
                    <h1>Bottom 3 Barang</h1>
                    </div>
                </div>
                <div class="main-modal3">
                    <h1>Table Dokumen Barang</h1>
                    <div class="ag-theme-alpine" style="width:100%;height:300px;margin-left:0px;margin-top: -105px;">
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
    )
}

export default Modal;