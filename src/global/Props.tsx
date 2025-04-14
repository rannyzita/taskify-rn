interface AuthContextType {
    taskList: Array<PropCard>,
    onOpen: void,
    handleEdit: Function,
    handleDelete: Function
}

type PropCard = {
    description: string,
    flag: PropFlags,
    item: number,
    timeLimit: string,
    title: string,
    [key: string]: any;
}

type PropFlags = 'urgente' | 'opcional'