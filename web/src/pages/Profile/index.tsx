import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg';

export default function Profile() {
    const history = useHistory();

    const ongName: string | null = localStorage.getItem('ongName');
    const ongId: string | null = localStorage.getItem('ongId');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data.incidents);
        })
    }, [])

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    async function handleDeleteIncidents(id: string) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter((incident: any) => incident?.id !== id))
        } catch(err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link to="/incidents" className="button">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents?.map((incident: any) => (
                    <li key={incident?.id}>
                        <strong>CASO:</strong>
                        <p>{incident?.title}</p>
                        
                        <strong>DESCRIÇÃO</strong>
                        <p>{incident?.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident?.value)}</p>

                        <button onClick={() => handleDeleteIncidents(incident?.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}