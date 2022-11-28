import { useState } from "react"
import { Alert, Platform, StyleSheet, View } from "react-native"
import { FAB, Switch, Text, TextInput } from "react-native-paper"
import dayjs from 'dayjs'
import api from "../api/api"

import MaskInput, { Masks } from 'react-native-mask-input'

export default function Adicionar({ navigation, route }) {
    const hoje = new Date().toISOString().split('T')[0]

    const registroInicial = {
        titulo: '', subTitulo: '', descricao: '', dataCriacao: hoje, dataAlteracao: hoje, prazo: '', concluido: false
    }
    const [afazer, setAfazer] = useState(registroInicial)

    const Adicionar = async (info) => {
        try {
            await api.post('toDoList/criar', info).then(() => {
                navigation.navigate('Home')
            })
        } catch (error) {
            Platform.OS === 'web' ?
                alert(`❗Erro: ${error.response.data.errors[0].msg}`) :
                Alert.alert("❗Erro: ", error.response.data.errors[0].msg)
        }
    }

    return (
        <View style={styles.view}>
            <TextInput label='Titulo' value={afazer.titulo} onChangeText={
                (text) => setAfazer({ ...afazer, titulo: text })
            } />
            <TextInput label='SubTitulo' value={afazer.subTitulo} onChangeText={
                (text) => setAfazer({ ...afazer, subTitulo: text })
            } />
            <TextInput
                numberOfLines={4} mode='outlined' multiline='true'
                label='Descrição' value={afazer.descricao} onChangeText={
                    (text) => setAfazer({ ...afazer, descricao: text })
                } />
            <TextInput disabled='true' label='Data de Criação' value={
                dayjs(afazer.dataCriacao).format('DD MMM YYYY')
            } onChangeText={
                (text) => setAfazer({ ...afazer, dataCriacao: text })
            } />
            <TextInput disabled='true' label='Data de Alteração' value={
                dayjs(afazer.dataAlteracao).format('DD MMM YYYY')
            } onChangeText={
                (text) => setAfazer({ ...afazer, dataAlteracao: text })
            } />
            <View style={styles.prazo}>
                <Text>Prazo da atividade</Text><br />
                <MaskInput
                    placeholder="yyyy/mm/dd"
                    mask={Masks.DATE_YYYYMMDD}
                    onChangeText={
                        (text) => setAfazer({ ...afazer, prazo: text })
                    }
                    value={afazer.prazo}
                /></View>
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
                label='Cancelar'
                onPress={() => navigation.navigate('Home')}
            />
            <FAB
                style={styles.fab1}
                label='Salvar'
                onPress={() => Adicionar({
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