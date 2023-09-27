import { Match, Show, Suspense, Switch, createSignal, useTransition, type Component, createEffect } from 'solid-js';

import GP from '../assets/Gien.pict.png'
import Cam1 from '../assets/camera-1.png'
import { login, register } from '../service/Service';
import './login.css'
import { FiCheckCircle, FiEye } from 'solid-icons/fi'
import { VsError } from 'solid-icons/vs'
import { A, useNavigate } from '@solidjs/router';

const Login: Component = () => {

    createEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/dashboard', { replace: true })
        }
    })

    const navigate = useNavigate();
    const [tab, setTab] = createSignal(0);
    const [pending, start] = useTransition();
    const updateTab = (index: any) => () => start(() => setTab(index));

    //////////login///////
    const [email, setEmail] = createSignal()
    const [password, setPassword] = createSignal()

    /////////////////register//////////////////
    const [username, setUsername] = createSignal()
    const [email1, setEmail1] = createSignal()
    const [password1, setPassword1] = createSignal()
    const [password3, setPassword3] = createSignal()

    const [verifikasiPass, setVerifikasiPass] = createSignal(true)
    const [ulum, setUlum] = createSignal(true)

    const [showlogin, setshowlogin] = createSignal(false)

    const showPass = async () => {
        let res: any = document.getElementById('pain');
        if (res.type == 'password') {
            res.type = "text";
        } else {
            res.type = "password";
        }
    }


    const showPass1 = async () => {
        let res: any = document.getElementById('showpass')
        if (res.type == 'password') {
            res.type = 'text';
        } else {
            res.type = 'password';
        }
    }

    const showPass50 = async () => {
        let res: any = document.getElementById('logpass')
        if (res.type == 'password') {
            res.type = 'text';
        } else {
            res.type = 'password';
        }
    }


    const [logKosong, setlogKosong] = createSignal(false);

    const login12 = async () => {
        // setlogKosong(false)


        console.log('email ->', email())
        console.log('password ->', password())
        // login({'email':email()})
        if ((email() !== undefined && email() !== '') && (password() !== undefined && password() !== '')) {

            login({ 'email': email(), 'password': password() }).then((data: any) => {
                console.log('akun ->', data);

                if (data.info == 'Login successfully') {
                    sessionStorage.setItem('token', data.token);
                    localStorage.setItem("auth", JSON.stringify(data));
                    console.log("GG -> ", localStorage.getItem("auth"))
                    navigate('/dashboard', { replace: true });
                }
                else {
                    alert('error')
                };
            })

        } else {
            console.log('Gien Darrel')
            setlogKosong(true);
        }


    }

    const [isOpen, setIsOpen] = createSignal(false);
    const [isEror, setIsEror] = createSignal(false);
    const [isKosong, setIsKosong] = createSignal(false);

    const register12 = async () => {
        setIsOpen(false);
        // setIsEror(false);
        setIsKosong(false);

        console.log('usename ->', username());
        console.log('email ->', email1());
        console.log('password ->', password1())
        console.log('confirm password ->', password3());
        if ((username() !== undefined && username() !== '') && (email1() !== undefined && email1() !== '')) {


            register({ 'username': username(), 'email': email1(), 'password': password1(), 'confirm': password3() }).then((data: any) => {
                console.log('akun anda', data)

                if (password1() == password3()) {
                    setIsOpen(true);

                } else {
                    console.log('konfimasi kembali sandi anda')


                };

            })
        } else {
            setIsKosong(true);
        }

    }

    const pilus = (evt: any) => {

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


        // console.log('regek email login', evt.currentTarget.value)
        // const passwordRegex: any = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        // console.log('darel ganteng ',passwordRegex.test(evt.currentTarget.value));
        // setUlum(passwordRegex.test(evt.currentTarget.value))


    }



    const testPassword = (evt: any) => {

        console.log('testPassword', evt.currentTarget.value)
        const passwordRegex: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        console.log("parse", passwordRegex.test(evt.currentTarget.value));
        setVerifikasiPass(passwordRegex.test(evt.currentTarget.value))
        setPassword1(evt.currentTarget.value)
        if (evt.currentTarget.value === '') {
            console.log('password1')
            setVerifikasiPass(true);
        } else {
            console.log('password2')
        }
    }

    return (
        <>
            <div class="wadah">


                <div class="form">
                    <ul class="inline">
                        <li classList={{ selected: tab() === 0 }} onClick={updateTab(0)}>
                            Login
                        </li>
                        <li classList={{ selected: tab() === 1 }} onClick={updateTab(1)}>
                            Register
                        </li>
                    </ul>
                    <Suspense fallback={<div class="loader">Loading...</div>}>
                        <Switch>
                            <Match when={tab() === 0}>

                                <div class="bungkuslog">
                                    <div class="kiri">
                                        <div class="welcome">
                                            <h1>Welcome Back !</h1>
                                        </div>
                                        <img src={GP} alt="" class='gp' />
                                        <input type="text" placeholder="Email" onkeyup={pilus} />
                                        <Show
                                            when={!ulum()}
                                        >
                                            <p>Email is not valid</p>
                                        </Show>
                                        <input type="password" placeholder="password" onchange={(a => { setPassword(a.currentTarget.value) })} id='logpass' />
                                        <div class="eye" onclick={showPass50}><FiEye /></div>
                                        <div class="gitar">

                                            <label for="my_modal_7" class="btn psx-11" onClick={login12}>Login</label>
                                            </div>
                                            <input type="checkbox" id="my_modal_7" class="modal-toggle" />
                                        {logKosong() && (

                                            <div class="modal">
                                                <div class="modal-box" >
                                                    <label class="modal-backdrop2" for="my_modal_7">Close</label>
                                                    <div class='eror2' style="font-size:50px;color:red;"><VsError /></div>
                                                    <label class='sc2'>Please fill in all data</label>
                                                </div>

                                            </div>

                                        )}
                                       
                                     
                                        
                                    </div>
                                    <div class="kanan">
                                        <div class="picture">
                                            <img src={Cam1} alt="" class='fotocam' />
                                        </div>
                                    </div>
                                </div>

                            </Match>
                            <Match when={tab() === 1}>
                            <div class="bungkuslog">
                                    <div class="kiri2">
                                        <div class="welcome">
                                            <h1>Let's Join!</h1>
                                        </div>
                                        <img src={GP} alt="" class='gp2' />
                                        <input type="text" placeholder="Username" onchange={(a => { setUsername(a.currentTarget.value) })} />
                                        <input type="text" placeholder="Email" onchange={(a => { setEmail1(a.currentTarget.value) })} />
                                        <input type="password" placeholder="Password" onKeyUp={testPassword} id="pain" />
                                        <input type="password" placeholder="Confirm Password" onchange={(a => { setPassword3(a.currentTarget.value) })} id='showpass' />
                                        <div class="eyes" onclick={showPass1}><FiEye /></div>
                                        <div class="eyes1" onclick={showPass}><FiEye /></div>

                                        <Show
                                            when={!verifikasiPass()}
                                        >
                                            <p>password harus berisi angka,kapital,simbol</p>
                                        </Show>
                                  
                                        <div class="gitar2">

                                            <label for="my_modal_7" class="btn psx-11" onClick={register12}>Register</label>
                                            </div>
                                            <input type="checkbox" id="my_modal_7" class="modal-toggle" />
                                            
                                            {isOpen() && (
                                            <div class="modal">

                                                <div class="modal-box" >
                                                    <label class="modal-backdrop2" for="my_modal_7">Close</label>
                                                    <div class='ceklis' style="font-size:50px;"><FiCheckCircle /></div>
                                                    <label class='sc3'>account created successfully</label>
                                                </div>

                                            </div>


                                        )}


                                        {isKosong() && (
                                            <div class="modal">
                                                <div class="modal-box" >
                                                    <label class="modal-backdrop2" for="my_modal_7">Close</label>
                                                    <div class='eror' style="font-size:50px;color:red;"><VsError /></div>
                                                    <label class='sc2'>Please fill in all data</label>
                                                </div>

                                            </div>  
                                        )}
                                    

                                        </div>
                                 
                                </div>

                            </Match>

                        </Switch>
                    </Suspense>

                </div>
            </div>

        </>
    )
}

export default Login