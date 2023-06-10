import React from "react";
import ReactLoading from "react-loading";
import { Section, Title, Article, Prop, list } from "./Generic";
import "./Loading.css";

const Loading = () => (
    <Section>
        <Article key={'spin'}>
            <ReactLoading type={'spin'} color="#293939" />
            <Prop>Conectando...</Prop>
        </Article>
    </Section>
);

export default Loading;
