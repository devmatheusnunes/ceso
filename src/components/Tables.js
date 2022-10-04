const columnsCollaborator = [
  { name: 'img_url', align: 'left', label: 'Avatar', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'NOME', field: 'name', sortable: true },
  { name: 'phone', align: 'left', label: 'Telefone', field: 'phone', sortable: false },
  { name: 'email', align: 'left', label: 'E-Mail', field: 'email', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: false }
]

const columnsCompany = [
  { name: 'name', align: 'left', label: 'RAZÃO SOCIAL', field: 'name', sortable: true },
  { name: 'created_at', align: 'left', label: 'CADASTRADO EM', field: 'created_at', sortable: true },
  { name: 'actions', align: 'right', label: 'AÇÕES', field: 'actions', sortable: false }
]

const columnsStore = [
  { name: 'name', align: 'left', label: 'LOJA', field: 'name', sortable: true },
  { name: 'created_at', align: 'left', label: 'CADASTRADO EM', field: 'created_at', sortable: true },
  { name: 'actions', align: 'right', label: 'AÇÕES', field: 'actions', sortable: false }
]

const columnsOffice = [
  { name: 'name', align: 'left', label: 'CARGO', field: 'name', sortable: true },
  { name: 'created_at', align: 'left', label: 'CADASTRADO EM', field: 'created_at', sortable: true },
  { name: 'actions', align: 'right', label: 'AÇÕES', field: 'actions', sortable: false }
]

export {
  columnsCollaborator,
  columnsCompany,
  columnsStore,
  columnsOffice
}
