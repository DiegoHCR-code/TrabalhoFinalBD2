import { useEffect, useState } from "react";
import { controleBD } from "../controleSupabase";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';


function ProdutoForm(){
    const navigate = useNavigate();
    let { state } = useLocation();

    
}

export default ProdutoForm;