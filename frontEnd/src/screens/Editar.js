import { useState } from "react"
import { Alert, Platform, StyleSheet, View } from "react-native"
import { FAB, Switch, Text, TextInput } from "react-native-paper"
import dayjs from 'dayjs'
import api from "../api/api"

import MaskInput, { Masks } from 'react-native-mask-input'

export default function Editar({ navigation, route }) {
    const registroInicial = route.params ? route.params.afazer : {
        titulo: '', subTitulo: '', descricao: '', dataCriacao: '', dataAlteracao: '', prazo: '', concluido: ''
    }
    const [afazer, setAfazer] = useState(registroInicial)

    const id = route.params?.id

    const Alterar = async (id, info) => {
        try {
            await api.post(`toDoList/atualizar/${id}`, info).then(() => {
                navigation.navigate('Home')
            })
        } catch (error) {
            Platform.OS === 'web' ?
                alert(`❗Erro: ${error.response.data.errors[0].msg}`) :
                Alert.alert("❗Erro: ", error.response.data.errors[0].msg)
        }
    }

    const Excluir = async (id) => {
        try {
            await api.delete(`toDoList/deletar/${id}`).then(() => {
                navigation.navigate('Home')
            })
        } catch (error) {
            Platform.OS === 'web' ?
                alert(`❗Erro: ${error.response.data.errors[0].msg}`) :
                Alert.alert("❗Erro: ", error.response.data.errors[0].msg)
        }
    }

    const hoje = new Date().toISOString().split('T')[0]

    return (
        <View style={styles.view}>
            <TextInput label='titulo' value={afazer.titulo} onChangeText={
                (text) => setAfazer({ ...afazer, titulo: text })
            } />
            <TextInput label='subTitulo' value={afazer.subTitulo} onChangeText={
                (text) => setAfazer({ ...afazer, subTitulo: text })
            } />
            <TextInput
                numberOfLines={4}
                mode='outlined' multiline='true'
                label='descricao' value={afazer.descricao} onChangeText={
                    (text) => setAfazer({ ...afazer, descricao: text })
                } />
            <TextInput disabled='true' label='dataCriacao' value={
                dayjs(afazer.dataCriacao).format('DD MMM YYYY')
            } onChangeText={
                (text) => setAfazer({ ...afazer, dataCriacao: text })
            } />
            <TextInput disabled='true' label='dataAlteracao' value={
                dayjs(afazer.dataAlteracao = hoje).format('DD MMM YYYY')
            } onChangeText={
                (text) => setAfazer({ ...afazer, dataAlteracao: text })
            } />
            <MaskInput style={styles.prazo}
                placeholder="yyyy/mm/dd"
                mask={Masks.DATE_YYYYMMDD}
                onChangeText={
                    (text) => setAfazer({ ...afazer, prazo: text })
                }
                value={afazer.prazo}
            />
            <View style={styles.concluido}>
                <Text>{
                    afazer.concluido === false ?
                        'Pendente: ' :
                        'Concluido: '
                }</Text>
                <Switch value={afazer.concluido} onValueChange={
                    (text) => setAfazer({ ...afazer, concluido: text })
                } />
            </View>
            <FAB
                style={styles.fab2}
                label='Excluir'
                onPress={() => Excluir(id)}
            />
            <FAB
                style={styles.fab1}
                label='Salvar'
                onPress={() => Alterar(id, {
                    "titulo": afazer.titulo,
                    "subTitulo": afazer.subTitulo,
                    "descricao": afazer.descricao,
                    "dataCriacao": afazer.dataCriacao,
                    "dataAlteracao": afazer.dataAlteracao,
                    "prazo": afazer.prazo,
                    "concluido": afazer.concluido
                })}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    prazo: {
        paddingTop: '16px',
        paddingLeft: '10px',
        paddingBottom: '16px',
        backgroundColor: '#e7e7e7',
        borderTopWidth: '1px',
        borderTopColor: '#7c2eed'
    },
    concluido: {
        flexDirection: "row",
        paddingTop: '16px',
        paddingLeft: '10px',
        paddingBottom: '16px',
        backgroundColor: '#e7e7e7'
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
})