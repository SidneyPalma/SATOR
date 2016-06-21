## Insumos utilizados no processo de esterilização
 - Insumo
    - Id:integer;
    - Nome: string(60);
    - Descricao: string(120);
    - CodigoBarra: string(20);
    - CodigoERP: string(20);
    - UnidadeMedida_id: integer;
    - QtdeEmbalagem: decimal(18,3);
    - ControlarEstoque?: boolean;
    - Fabricante_id: integer;
    - Fornecedor_id: integer;
    - RegistroANVISA: string(50);
    - EstoqueMaximo: decimal(18,3);
    - EstoqueMinimo: decimal(18,3);
    - PontoReposicao: decimal(18,3);
    - PrazoEntregaDias: integer;
    - ValidadeAposAtivacaoDias: integer;
    - ObrigatorioTesteInsumo?: integer;
    - ProcessosQtde: integer;
    - Ativo: boolean;
       - SaldoInsumo
          - Id: integer;
          - Insumo_id: integer;
          - Deposito_id: integer;
          - Lote: string(20);
          - QtdeInicial: decimal(18,3);
          - QtdeDisponivel: decimal(18,3);
          - DataFabricacao: date;
          - DataValidade: date;
          - PrecoVendaMedio: decimal(18,2);
       - MovimentoInsumo
          - Id: integer;
          - Insumo_id: integer;
          - Colaborador_id: integer;
          - FlagEntradaSaida: char(1);
          - DataHora: datetime;
          - Quantidade: decimal(18,3);
          - Lote: string(20);
          - DataFabricacao: date;
          - DataValidade: date;
          - NumNotaFiscal: string(20);
          - PreçoNotaFiscal: decimal(18,2);
          - PrecoCusto: decimal(18,2);
          - PrecoVenda: decimal(18,2);
          - ResiduoDestino_id: integer;
          - Equipamento_id: integer;

Exemplo:

    Id: 1;
    Nome: Ácido Peracético - Anioxyde 1000
    Descricao: Ácido Peracético - Anioxide 1000 Desinfetante de alto nível.
    CodigoBarra: 1
    CodigoERP:
    UnidadeMedida_id: 1
    Embalagem_id: 1
    QtdeEmbalagem: 5,000
    ControlarEstoque?: 1
    Fabricante_id: 1
    Fornecedor_id: 1
    RegistroANVISA: 327210004
    EstoqueMaximo: 30,000
    EstoqueMinimo:  5,000
    ProntoReposicao: 15,000
    PrazoEntregaDias: 30
    ValidadeAposAtivacaoDias: 22
    ObrigatorioTesteInsumo?: 0
    ProcessoQtde: 10
    Ativo: 1