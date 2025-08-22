import type { Passenger, Driver } from '../types';

export const PASSENGER_DATABASE: Passenger[] = [
    {
        id: 'P1703123456789_14475713',
        nombreCompleto: 'ANELISA JOSEFINA HUERTA DELGADO',
        nroCedula: '14475713',
        gerencia: 'INGENIERIA DE PETROLEO'
    },
    {
        id: 'P1703123456790_21353310',
        nombreCompleto: 'EDUARDO JOSE SILVA RANGEL',
        nroCedula: '21353310',
        gerencia: 'FACILIDADES'
    },
    {
        id: 'P1703123456791_22134565',
        nombreCompleto: 'JESUS DANIEL MARQUEZ DIOMAIUTO',
        nroCedula: '22134565',
        gerencia: 'CONTRATACION'
    },
    {
        id: 'P1703123456792_22147204',
        nombreCompleto: 'ROSSANA CAROLINA ROMERO CORDERO',
        nroCedula: '22147204',
        gerencia: 'SALUD'
    },
    {
        id: 'P1703123456793_27056942',
        nombreCompleto: 'INES MARIA MORAN JIMENEZ',
        nroCedula: '27056942',
        gerencia: 'FINANZAS'
    },
    {
        id: 'P1703123456794_27848103',
        nombreCompleto: 'ANA VILLASMIL',
        nroCedula: '27848103',
        gerencia: 'FINANZAS'
    },
];

export const DRIVER_DATABASE: Driver[] = [
    {
        id: 'drv_001',
        nombreCompleto: 'ALBERTO ROMERO',
        unidad: '274',
    },
     {
        id: 'drv_002',
        nombreCompleto: 'CARLOS PEREZ',
        unidad: '150',
    }
];
