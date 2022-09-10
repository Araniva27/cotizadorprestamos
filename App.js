/**
 * @format
 * @flow strict-local
 */

import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, propTypes } from "react-native";
import Footer from "./src/components/Footer";
import Form from "./src/components/Forms";
import Result from "./src/components/Result";
import colors from "./src/utils/colors";

export default function App() {
  //Definiendo Hooks, que almanacenan los datos
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  //El useEffect, se ejecuta cuando los elementos entre [] cambien
  useEffect(() => {
    if (capital && interest && months) {
      calculate();
    } else {
      reset();
    }
  },[capital, interest, months]);

  //Función para calcular los datos de la app
  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage("Añade la cantidad que quieres solicitar");
    } else if (!interest) {
      setErrorMessage("Añade el interes del préstamo");
    } else if (!months) {
      setErrorMessage("Seleccione los meses a pagar");
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -months)) / i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace(".", ","),
        totalPayable: (fee * months).toFixed(2).replace(".", ","),
      });
    }
  };

  const reset = () => {
    setErrorMessage("");
    setTotal(null);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.Header}>
        <View style={styles.backgroundColor} />
        <Text style={styles.titleApp}>Cotizador de prestamos</Text>        
        <Form
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <Result
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage}
      />
      <Footer calculate={calculate} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Header: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  HeadApp: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
  },
  safeArea: {
    height: 290,
    alignItems: "center",
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "absolute",
    zIndex: -1,
  },
  titleApp: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 15,
  },
});
