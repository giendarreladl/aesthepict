import { createSignal } from "solid-js";
import { apiUrl,apiDummy,api } from "../config/api";


export class DataPoiResponse {
    summary: any;
    poi: any;
    detail: any;
    sites : any;
}


const getDetailPoi = async (poi_name: string) =>  {
    const [data, setData] = createSignal(new DataPoiResponse());
    const [error, setError] = createSignal();

    const url = `${apiUrl}/posko_naru_afterclick?poi_name=${poi_name}`;
    await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
        .then((data) => {
            setData(data);
        }
    ).catch((err) => {
        setError(err);
        console.log(error());
    });
    return data();
}

const getSummaryNaru = async () => {
    const [data, setData] = createSignal(new DataPoiResponse());
    const [error, setError] = createSignal();

    const url = `${apiUrl}/get_poi_data`;
    await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
        .then((data: DataPoiResponse) => {
            setData(data);
        }
    ).catch((err) => {
        setError(err);
        console.log(error());
    });
    return data();
}

const getDataMap = async () =>  {
    const [data, setData] = createSignal();
    const [error, setError] = createSignal();

    const url = `${apiDummy}map.json`;
    await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
        .then((data) => {
            setData(data);
        }
    ).catch((err) => {
        setError(err);
        console.log(error());
    });
    return data();
}

const getDetailPoi2 = async (poi_name: string) =>   {
    const [data, setData] = createSignal(new DataPoiResponse());
    const [error, setError] = createSignal();

    const url = `${api}search.json`;
    await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
        .then((data) => {
            setData(data);
        }
    ).catch((err) => {
        setError(err);
        console.log(error());
    });
    return data();
}

const getDokumen = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}pabean`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek data",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error()); 
  });
  return data();
}

const getBarang = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}barang`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek barang",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error());
  });
  return data();
}

const   getFilterDoc = async (jenis : any,from : any,to : any) =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}prmpabean?jenis=${jenis}&start=${from}&end=${to}`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek dokumen Filter",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error()); 
  });
  return data();
}

const getJenis = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}jenis`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek dokumen Filter",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error()); 
  });
  return data();
}

const getAmchartJumlah = async (tahun : any) =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}total?tahun=${tahun}`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek performa",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error());
  });
  return data();
}

const getAmchart = async (bulan : any,tahun : any) =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}statis?bulan=${bulan}&tahun=${tahun}`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("data amchart",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error());
  });
  return data();
}


const login = async (body_params: any) => {
    const [data, setData] = createSignal();
    const [error, setError] = createSignal();
    const url = `${api}login`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_params),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
    return data();
  };
  
const register = async (body_params: any) => {
    const [data, setData] = createSignal();
    const [error, setError] = createSignal();
    const url = `${api}reg`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_params),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
    return data();
  };


  const getAuth = async (token : any,id : any) =>   {
    const [data, setData] = createSignal();
    const [error, setError] = createSignal();
  
    const url = `${api}auth_token?token=${token}&id=${id}`;
    await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
        .then((data) => {
          // console.log("cek dokumen Filter",data);
            setData(data);
        }
    ).catch((err) => {
        setError(err);
        console.log(error()); 
    });
    return data();
}

const getHasilFoto = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}foto`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek gambar",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      // // // console.log(error());
  });
  return data();
}

const ordergp = async (body_params: any) => {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();
  const url = `${api}pesan`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body_params),
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      setError(err);
      console.log(err);
    });
  return data();
};

const updateorder = async (body_params: any) => {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();
  const url = `${api}update`;
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body_params),
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      setError(err);
      console.log(err);
    });
  return data();
};

const gettabelor = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}orderan`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek data",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error()); 
  });
  return data();
}

const getHarga = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}daftar_harga`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek data",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error()); 
  });
  return data();
}

const getChart = async () =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}amchart`;
  await fetch(url, {headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek chart",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      console.log(error());
  });
  return data();
}
  
const DeleteOrder = async (id:any) =>   {
  const [data, setData] = createSignal();
  const [error, setError] = createSignal();

  const url = `${api}deletee?id=${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {"Content-type": "application/json;charset=UTF-8"}}).then((res) => res.json())
      .then((data) => {
        console.log("cek delete",data);
          setData(data);
      }
  ).catch((err) => {
      setError(err);
      // // // console.log(error());
  });
  return data();
};




  

export {
    getDetailPoi,
    getDetailPoi2,
    getSummaryNaru,
    getDataMap,
    getDokumen,
    getBarang,
    getAmchartJumlah,
    login,
    register,
    getFilterDoc,
    getJenis,
    getAuth,
    getAmchart,
    getHasilFoto,
    ordergp,
    gettabelor,
    getHarga,
    getChart,
    updateorder,
    DeleteOrder
}