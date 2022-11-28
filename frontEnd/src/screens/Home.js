import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, FAB, Title } from "react-native-paper";
import dayjs from 'dayjs'
import api from "../api/api";

export default function Home({ navigation }) {
    const [listar, setListar] = useState([])

    useEffect(() => {
        api.get('toDoList/listar').then(response => {
            setListar(response.data)
        })
    }, [listar])

    const Excluir = async () => {
        let i = 0
        let b = 0
        let id = 0
        b = listar.push('_id')
        console.log('b', b - 1)
        while (i < b - 1) {
            console.log(
                id = listar[i]._id,
                await api.delete(`toDoList/deletar/${id}`)
            )
            i++
        }
        console.log('i', i)
    }

    return (
        <View style={styles.container}>
            <FlatList data={listar}
                renderItem={
                    ({ item }) =>
                        <Card
                            onPress={() => navigation.navigate('Detalhes', { id: item._id, item: item })}
                        >
                            <Card.Content>
                                <Title>{item.titulo}</Title>
                                <Text>{item.subTitulo}</Text>
                                <View
                                    style={styles.view}
                                >
                                    <Text>
                                        Prazo: {
                                            item.prazo == '' ?
                                                'Sem prazo' :
                                                `${dayjs(item.prazo).format('DD MMM YYYY')}`
                                        }
                                    </Text>
                                    <Text>{
                                        item.concluido === false ?
                                            'Pendente' :
                                            'Concluido'
                                    }</Text>
                                </View>
                            </Card.Content>
                        </Card>
                }
            />
            <Text style={styles.mesage}>{
                listar == 0 ?
                    'Não foi encontrado nada para listar :D' :
                    ''
            }</Text>
            < FAB
                style={styles.fab2}
                label='Adicionar'
                onPress={() => navigation.navigate('Adicionar')}
            />
            <FAB
                style={styles.fab1}
                label='Excluir tudo'
                onPress={() => Excluir()}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: '126px'
    },
    mesage: {
        position: 'fixed',
        margin: 16,
    },
    view: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: '1px',
        borderTopColor: '#7c2eed',
        marginTop: '16px'
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
    }
});
