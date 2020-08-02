import { Categoria } from './categoria';
import { Promocion } from './promocion';

export class Product {
    prd_id: number;
    cat_id: number;
    prm_id: number;
    prd_nom: string;
    prd_img: string;
    prd_tal: string;
    prd_crt: string;
    prd_cnt: string;
    prd_prc: string;
    prd_dateOfCreated: string;
    Categoria: Categoria;
    Promocion: Promocion;
}
