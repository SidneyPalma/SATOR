## Kits 
#### (Conjunto de Materiais)
 - Kit
    - id:integer;
    - Nome:string(60);
    - CodigoBarra: string(20);
    - Cor1: string(20);
    - Cor2: string(20);
    - Cor3: string(20);
    - Cor4: string(20);
    - Tamanho_id: integer;
    - Embalagem_id: integer;
    - MaterialStatus_id: integer;
    - ExigeProntuario: bolean;
    - Ativo:boolean;
         - KitDetalhe
            - id: integer;
            - Seq: integer;
            - Material_id;

Exemplo:

    id: 1;
    Nome: Bd. Peq. Cirurgia S.O. 1;
    CodigoBarra: Z5550001
    Cor1: 
    Cor2:
    Cor3:
    Cor4:
    Tamanho_id: 1;
    Embalagem_id: 2;
    Situracao_id: 1; //MaterialStatus
    ExigeProntuario: 0;
    Ativo: 1;
        id: 1;
        seq: 1;
        Material: 1
        .....
        id: 1;
        seq: 1;
        Material: 2