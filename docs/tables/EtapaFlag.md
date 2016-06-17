## Etapa Flags.
 - EtapaFlag
    - id:integer;
    - Nome:string(60);
    - Ativo:boolean;

Exemplo: (markflagstep)

    id:1;
    Nome: Exige Leitura de Entrada;
    Ativo: 1;
    .....
    id:2;
    Nome: Exige Leitura de Saida;
    Ativo: 1;
    .....
    id:3;
    Nome: Conferencia Visual Exigida;
    Ativo: 1;
    
## DML
    EnumType
        markflagstep