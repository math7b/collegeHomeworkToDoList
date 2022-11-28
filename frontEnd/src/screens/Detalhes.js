import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, View } from "react-native";
import { Card, Button, Title, FAB } from "react-native-paper";
import dayjs from 'dayjs'
import api from "../api/api";

export default function Detalhes({ navigation, route }) {
    const registroInicial = route.params.item
    const [lista, setLista] = useState(registroInicial)

    const id = route.params?.id

    const Excluir = async (_id) => {
        try {
            await api.delete(`toDoList/deletar/${_id}`).then(() => {
                navigation.navigate('Home')
            })
        } catch (error) {
            Platform.OS === 'web' ?
                alert(`❗Erro: ${error.response.data.errors[0].msg}`) :
                Alert.alert("❗Erro: ", error.response.data.errors[0].msg)
        }
    }

    return (
        <Card style={styles.card}>
            <View style={styles.view}>

                <Title style={styles.title}>
                    {lista.titulo}
                </Title>
                <Text style={styles.subTitulo}>
                    {lista.subTitulo}
                </Text>
                <Text style={styles.descricao}>
                    Descrição: {
                        lista.descricao == '' ?
                            'Sem descrição' :
                            `${lista.descricao}`
                    }
                </Text>
                <Text style={styles.prazo}>
                    Data limite: {
                        lista.prazo == '' ?
                            'Sem prazo' :
                            `${dayjs(lista.prazo).format('DD MMM YYYY')}`
                    }
                </Text>
                <Text style={styles.dataCriacao}>
                    Data de criação: {
                        dayjs(lista.dataCriacao).format('DD MMM YYYY')
                    }
                </Text>
                <Text style={styles.dataAlteracao}>
                    Data de alteração: {
                        lista.dataAlteracao == '' ?
                            'Sem alteração' :
                            `${dayjs(lista.dataAlteracao).format('DD MMM YYYY')}`
                    }
                </Text>
                <Text style={styles.concluido}>
                    Estatus: {
                        lista.concluido === false ?
                            'Pendente' :
                            'Concluido'
                    }
                </Text>
            </View>
            <FAB
                style={styles.fab3}
                label='Excluir'
                onPress={() => Excluir(id)}
            />
            <FAB
                style={styles.fab2}
                label='Editar'
                onPress={() => navigation.navigate('Editar', { id: id, afazer: lista })}
            />
            <FAB
                style={styles.fab1}
                label='Adicionar'
                onPress={() => navigation.navigate('Adicionar')}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: '90%'
    },
    view: {
        flex: 1,
    },
    title: {
        textAlign: 'center'
    },
    subTitulo: {
        marginLeft: '8px'
    },
    descricao: {
        marginLeft: '8px',
        marginTop: '16px',
        marginBottom: '32px',
        marginRight: '8px'
    },
    dataCriacao: {
        marginLeft: '8px',
        marginTop: '4px'
    },
    dataAlteracao: {
        marginLeft: '8px',
        marginTop: '4px',
        marginBottom: '16px'
    },
    prazo: {
        marginLeft: '8px',
        marginTop: '8px',
        marginBottom: '16px'
    },
    concluido: {
        marginLeft: '8px',
        marginBottom: '32px'
    },
    fab1: {
        position: 'fixed',
        margin: 16,
        right: 4,
        bottom: 8
    },
    fab2: {
        position: 'fixed',
        margin: 16,
        right: 4,
        bottom: 64
    },
    fab3: {
        position: 'fixed',
        margin: 16,
        right: 4,
        bottom: 120
    }
})