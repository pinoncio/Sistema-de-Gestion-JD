PGDMP      7                 }        
   Sistema JD    16.6    16.4 �    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Z           1262    16389 
   Sistema JD    DATABASE     t   CREATE DATABASE "Sistema JD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE "Sistema JD";
                Sistema JD_owner    false            [           0    0    DATABASE "Sistema JD"    ACL     6   GRANT ALL ON DATABASE "Sistema JD" TO neon_superuser;
                   Sistema JD_owner    false    3674            �            1259    90418    cliente    TABLE     H  CREATE TABLE public.cliente (
    "ID_CLIENTE" integer NOT NULL,
    "CODIGO_CLIENTE" character varying(255),
    "NOMBRE_RAZON_SOCIAL" character varying(255) NOT NULL,
    "NOMBRE_FANTASIA" character varying(255),
    "RUT" character varying(255),
    "GIRO" character varying(255),
    "DIRECCION" character varying(255),
    "CIUDAD" character varying(255),
    "COMUNA" character varying(255),
    "TELEFONO_FIJO" character varying(255),
    "TELEFONO_CELULAR" character varying(255),
    "CORREO_ELECTRONICO" character varying(255),
    "CLIENTE_VIGENTE" boolean DEFAULT true
);
    DROP TABLE public.cliente;
       public         heap    Sistema JD_owner    false            �            1259    90417    cliente_ID_CLIENTE_seq    SEQUENCE     �   CREATE SEQUENCE public."cliente_ID_CLIENTE_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."cliente_ID_CLIENTE_seq";
       public          Sistema JD_owner    false    220            \           0    0    cliente_ID_CLIENTE_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."cliente_ID_CLIENTE_seq" OWNED BY public.cliente."ID_CLIENTE";
          public          Sistema JD_owner    false    219            �            1259    90502    cliente_metodo_pago    TABLE     �   CREATE TABLE public.cliente_metodo_pago (
    "ID_CLIENTE" integer NOT NULL,
    "ID_METODO_PAGO" integer NOT NULL,
    "REFERENCIA" character varying(255),
    id integer NOT NULL
);
 '   DROP TABLE public.cliente_metodo_pago;
       public         heap    Sistema JD_owner    false            �            1259    147655    cliente_metodo_pago_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_metodo_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.cliente_metodo_pago_id_seq;
       public          Sistema JD_owner    false    223            ]           0    0    cliente_metodo_pago_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cliente_metodo_pago_id_seq OWNED BY public.cliente_metodo_pago.id;
          public          Sistema JD_owner    false    226            �            1259    114840    metodo_pago    TABLE     �   CREATE TABLE public.metodo_pago (
    "ID_METODO_PAGO" integer NOT NULL,
    "NOMBRE_METODO" character varying(255),
    "DESCRIPCION" character varying(255)
);
    DROP TABLE public.metodo_pago;
       public         heap    Sistema JD_owner    false            �            1259    114839    metodo_pago_ID_METODO_PAGO_seq    SEQUENCE     �   CREATE SEQUENCE public."metodo_pago_ID_METODO_PAGO_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."metodo_pago_ID_METODO_PAGO_seq";
       public          Sistema JD_owner    false    225            ^           0    0    metodo_pago_ID_METODO_PAGO_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."metodo_pago_ID_METODO_PAGO_seq" OWNED BY public.metodo_pago."ID_METODO_PAGO";
          public          Sistema JD_owner    false    224            �            1259    90496    metodos_pago    TABLE     �   CREATE TABLE public.metodos_pago (
    "ID_METODO_PAGO" integer NOT NULL,
    "NOMBRE_METODO" character varying(255),
    "DESCRIPCION" character varying(255)
);
     DROP TABLE public.metodos_pago;
       public         heap    Sistema JD_owner    false            �            1259    90495    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE     �   CREATE SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq";
       public          Sistema JD_owner    false    222            _           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq" OWNED BY public.metodos_pago."ID_METODO_PAGO";
          public          Sistema JD_owner    false    221            �            1259    57380    rol    TABLE     d   CREATE TABLE public.rol (
    "ID_ROL" integer NOT NULL,
    "NOMBRE_ROL" character varying(255)
);
    DROP TABLE public.rol;
       public         heap    Sistema JD_owner    false            �            1259    57379    rol_ID_ROL_seq    SEQUENCE     �   CREATE SEQUENCE public."rol_ID_ROL_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."rol_ID_ROL_seq";
       public          Sistema JD_owner    false    216            `           0    0    rol_ID_ROL_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."rol_ID_ROL_seq" OWNED BY public.rol."ID_ROL";
          public          Sistema JD_owner    false    215            �            1259    57389    usuario    TABLE     �  CREATE TABLE public.usuario (
    "ID_USUARIO" integer NOT NULL,
    "NOMBRE_USUARIO" character varying(255),
    "APELLIDO_USUARIO" character varying(255),
    "RUT_USUARIO" character varying(255),
    "EMAIL_USUARIO" character varying(255),
    "CONTRASENIA_USUARIO" character varying(255),
    "FECHA_NACIMIENTO_USUARIO" timestamp with time zone,
    "ROL_USUARIO" integer,
    "ESTADO_USUARIO" boolean DEFAULT true
);
    DROP TABLE public.usuario;
       public         heap    Sistema JD_owner    false            �            1259    57388    usuario_ID_USUARIO_seq    SEQUENCE     �   CREATE SEQUENCE public."usuario_ID_USUARIO_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."usuario_ID_USUARIO_seq";
       public          Sistema JD_owner    false    218            a           0    0    usuario_ID_USUARIO_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."usuario_ID_USUARIO_seq" OWNED BY public.usuario."ID_USUARIO";
          public          Sistema JD_owner    false    217            �           2604    90421    cliente ID_CLIENTE    DEFAULT     |   ALTER TABLE ONLY public.cliente ALTER COLUMN "ID_CLIENTE" SET DEFAULT nextval('public."cliente_ID_CLIENTE_seq"'::regclass);
 C   ALTER TABLE public.cliente ALTER COLUMN "ID_CLIENTE" DROP DEFAULT;
       public          Sistema JD_owner    false    219    220    220            �           2604    147656    cliente_metodo_pago id    DEFAULT     �   ALTER TABLE ONLY public.cliente_metodo_pago ALTER COLUMN id SET DEFAULT nextval('public.cliente_metodo_pago_id_seq'::regclass);
 E   ALTER TABLE public.cliente_metodo_pago ALTER COLUMN id DROP DEFAULT;
       public          Sistema JD_owner    false    226    223            �           2604    114843    metodo_pago ID_METODO_PAGO    DEFAULT     �   ALTER TABLE ONLY public.metodo_pago ALTER COLUMN "ID_METODO_PAGO" SET DEFAULT nextval('public."metodo_pago_ID_METODO_PAGO_seq"'::regclass);
 K   ALTER TABLE public.metodo_pago ALTER COLUMN "ID_METODO_PAGO" DROP DEFAULT;
       public          Sistema JD_owner    false    225    224    225            �           2604    90499    metodos_pago ID_METODO_PAGO    DEFAULT     �   ALTER TABLE ONLY public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" SET DEFAULT nextval('public."metodos_pago_ID_METODO_PAGO_seq"'::regclass);
 L   ALTER TABLE public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" DROP DEFAULT;
       public          Sistema JD_owner    false    222    221    222            �           2604    57383 
   rol ID_ROL    DEFAULT     l   ALTER TABLE ONLY public.rol ALTER COLUMN "ID_ROL" SET DEFAULT nextval('public."rol_ID_ROL_seq"'::regclass);
 ;   ALTER TABLE public.rol ALTER COLUMN "ID_ROL" DROP DEFAULT;
       public          Sistema JD_owner    false    215    216    216            �           2604    57392    usuario ID_USUARIO    DEFAULT     |   ALTER TABLE ONLY public.usuario ALTER COLUMN "ID_USUARIO" SET DEFAULT nextval('public."usuario_ID_USUARIO_seq"'::regclass);
 C   ALTER TABLE public.usuario ALTER COLUMN "ID_USUARIO" DROP DEFAULT;
       public          Sistema JD_owner    false    218    217    218            N          0    90418    cliente 
   TABLE DATA           �   COPY public.cliente ("ID_CLIENTE", "CODIGO_CLIENTE", "NOMBRE_RAZON_SOCIAL", "NOMBRE_FANTASIA", "RUT", "GIRO", "DIRECCION", "CIUDAD", "COMUNA", "TELEFONO_FIJO", "TELEFONO_CELULAR", "CORREO_ELECTRONICO", "CLIENTE_VIGENTE") FROM stdin;
    public          Sistema JD_owner    false    220   !	      Q          0    90502    cliente_metodo_pago 
   TABLE DATA           _   COPY public.cliente_metodo_pago ("ID_CLIENTE", "ID_METODO_PAGO", "REFERENCIA", id) FROM stdin;
    public          Sistema JD_owner    false    223   t
      S          0    114840    metodo_pago 
   TABLE DATA           W   COPY public.metodo_pago ("ID_METODO_PAGO", "NOMBRE_METODO", "DESCRIPCION") FROM stdin;
    public          Sistema JD_owner    false    225   �
      P          0    90496    metodos_pago 
   TABLE DATA           X   COPY public.metodos_pago ("ID_METODO_PAGO", "NOMBRE_METODO", "DESCRIPCION") FROM stdin;
    public          Sistema JD_owner    false    222   �
      J          0    57380    rol 
   TABLE DATA           5   COPY public.rol ("ID_ROL", "NOMBRE_ROL") FROM stdin;
    public          Sistema JD_owner    false    216   �      L          0    57389    usuario 
   TABLE DATA           �   COPY public.usuario ("ID_USUARIO", "NOMBRE_USUARIO", "APELLIDO_USUARIO", "RUT_USUARIO", "EMAIL_USUARIO", "CONTRASENIA_USUARIO", "FECHA_NACIMIENTO_USUARIO", "ROL_USUARIO", "ESTADO_USUARIO") FROM stdin;
    public          Sistema JD_owner    false    218   �      b           0    0    cliente_ID_CLIENTE_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."cliente_ID_CLIENTE_seq"', 4, true);
          public          Sistema JD_owner    false    219            c           0    0    cliente_metodo_pago_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cliente_metodo_pago_id_seq', 5, true);
          public          Sistema JD_owner    false    226            d           0    0    metodo_pago_ID_METODO_PAGO_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."metodo_pago_ID_METODO_PAGO_seq"', 1, false);
          public          Sistema JD_owner    false    224            e           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."metodos_pago_ID_METODO_PAGO_seq"', 6, true);
          public          Sistema JD_owner    false    221            f           0    0    rol_ID_ROL_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."rol_ID_ROL_seq"', 15, true);
          public          Sistema JD_owner    false    215            g           0    0    usuario_ID_USUARIO_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."usuario_ID_USUARIO_seq"', 22, true);
          public          Sistema JD_owner    false    217            8           2606    180502 &   cliente cliente_CORREO_ELECTRONICO_key 
   CONSTRAINT     s   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key" UNIQUE ("CORREO_ELECTRONICO");
 R   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key";
       public            Sistema JD_owner    false    220            :           2606    180504 '   cliente cliente_CORREO_ELECTRONICO_key1 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key1" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key1";
       public            Sistema JD_owner    false    220            <           2606    180466 (   cliente cliente_CORREO_ELECTRONICO_key10 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key10" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key10";
       public            Sistema JD_owner    false    220            >           2606    180468 (   cliente cliente_CORREO_ELECTRONICO_key11 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key11" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key11";
       public            Sistema JD_owner    false    220            @           2606    180494 (   cliente cliente_CORREO_ELECTRONICO_key12 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key12" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key12";
       public            Sistema JD_owner    false    220            B           2606    180470 (   cliente cliente_CORREO_ELECTRONICO_key13 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key13" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key13";
       public            Sistema JD_owner    false    220            D           2606    180472 (   cliente cliente_CORREO_ELECTRONICO_key14 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key14" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key14";
       public            Sistema JD_owner    false    220            F           2606    180492 (   cliente cliente_CORREO_ELECTRONICO_key15 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key15" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key15";
       public            Sistema JD_owner    false    220            H           2606    180474 (   cliente cliente_CORREO_ELECTRONICO_key16 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key16" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key16";
       public            Sistema JD_owner    false    220            J           2606    180476 (   cliente cliente_CORREO_ELECTRONICO_key17 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key17" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key17";
       public            Sistema JD_owner    false    220            L           2606    180490 (   cliente cliente_CORREO_ELECTRONICO_key18 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key18" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key18";
       public            Sistema JD_owner    false    220            N           2606    180488 (   cliente cliente_CORREO_ELECTRONICO_key19 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key19" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key19";
       public            Sistema JD_owner    false    220            P           2606    180506 '   cliente cliente_CORREO_ELECTRONICO_key2 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key2" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key2";
       public            Sistema JD_owner    false    220            R           2606    180478 (   cliente cliente_CORREO_ELECTRONICO_key20 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key20" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key20";
       public            Sistema JD_owner    false    220            T           2606    180486 (   cliente cliente_CORREO_ELECTRONICO_key21 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key21" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key21";
       public            Sistema JD_owner    false    220            V           2606    180518 (   cliente cliente_CORREO_ELECTRONICO_key22 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key22" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key22";
       public            Sistema JD_owner    false    220            X           2606    180484 (   cliente cliente_CORREO_ELECTRONICO_key23 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key23" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key23";
       public            Sistema JD_owner    false    220            Z           2606    180520 (   cliente cliente_CORREO_ELECTRONICO_key24 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key24" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key24";
       public            Sistema JD_owner    false    220            \           2606    180482 (   cliente cliente_CORREO_ELECTRONICO_key25 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key25" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key25";
       public            Sistema JD_owner    false    220            ^           2606    180522 (   cliente cliente_CORREO_ELECTRONICO_key26 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key26" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key26";
       public            Sistema JD_owner    false    220            `           2606    180480 (   cliente cliente_CORREO_ELECTRONICO_key27 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key27" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key27";
       public            Sistema JD_owner    false    220            b           2606    180524 (   cliente cliente_CORREO_ELECTRONICO_key28 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key28" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key28";
       public            Sistema JD_owner    false    220            d           2606    180516 (   cliente cliente_CORREO_ELECTRONICO_key29 
   CONSTRAINT     u   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key29" UNIQUE ("CORREO_ELECTRONICO");
 T   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key29";
       public            Sistema JD_owner    false    220            f           2606    180508 '   cliente cliente_CORREO_ELECTRONICO_key3 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key3" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key3";
       public            Sistema JD_owner    false    220            h           2606    180500 '   cliente cliente_CORREO_ELECTRONICO_key4 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key4" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key4";
       public            Sistema JD_owner    false    220            j           2606    180510 '   cliente cliente_CORREO_ELECTRONICO_key5 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key5" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key5";
       public            Sistema JD_owner    false    220            l           2606    180512 '   cliente cliente_CORREO_ELECTRONICO_key6 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key6" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key6";
       public            Sistema JD_owner    false    220            n           2606    180498 '   cliente cliente_CORREO_ELECTRONICO_key7 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key7" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key7";
       public            Sistema JD_owner    false    220            p           2606    180514 '   cliente cliente_CORREO_ELECTRONICO_key8 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key8" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key8";
       public            Sistema JD_owner    false    220            r           2606    180496 '   cliente cliente_CORREO_ELECTRONICO_key9 
   CONSTRAINT     t   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_CORREO_ELECTRONICO_key9" UNIQUE ("CORREO_ELECTRONICO");
 S   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_CORREO_ELECTRONICO_key9";
       public            Sistema JD_owner    false    220            t           2606    180430    cliente cliente_RUT_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key" UNIQUE ("RUT");
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key";
       public            Sistema JD_owner    false    220            v           2606    180432    cliente cliente_RUT_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key1" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key1";
       public            Sistema JD_owner    false    220            x           2606    180444    cliente cliente_RUT_key10 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key10" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key10";
       public            Sistema JD_owner    false    220            z           2606    180446    cliente cliente_RUT_key11 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key11" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key11";
       public            Sistema JD_owner    false    220            |           2606    180422    cliente cliente_RUT_key12 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key12" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key12";
       public            Sistema JD_owner    false    220            ~           2606    180448    cliente cliente_RUT_key13 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key13" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key13";
       public            Sistema JD_owner    false    220            �           2606    180450    cliente cliente_RUT_key14 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key14" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key14";
       public            Sistema JD_owner    false    220            �           2606    180420    cliente cliente_RUT_key15 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key15" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key15";
       public            Sistema JD_owner    false    220            �           2606    180452    cliente cliente_RUT_key16 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key16" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key16";
       public            Sistema JD_owner    false    220            �           2606    180418    cliente cliente_RUT_key17 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key17" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key17";
       public            Sistema JD_owner    false    220            �           2606    180416    cliente cliente_RUT_key18 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key18" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key18";
       public            Sistema JD_owner    false    220            �           2606    180414    cliente cliente_RUT_key19 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key19" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key19";
       public            Sistema JD_owner    false    220            �           2606    180434    cliente cliente_RUT_key2 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key2" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key2";
       public            Sistema JD_owner    false    220            �           2606    180454    cliente cliente_RUT_key20 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key20" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key20";
       public            Sistema JD_owner    false    220            �           2606    180412    cliente cliente_RUT_key21 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key21" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key21";
       public            Sistema JD_owner    false    220            �           2606    180456    cliente cliente_RUT_key22 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key22" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key22";
       public            Sistema JD_owner    false    220            �           2606    180410    cliente cliente_RUT_key23 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key23" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key23";
       public            Sistema JD_owner    false    220            �           2606    180458    cliente cliente_RUT_key24 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key24" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key24";
       public            Sistema JD_owner    false    220            �           2606    180408    cliente cliente_RUT_key25 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key25" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key25";
       public            Sistema JD_owner    false    220            �           2606    180460    cliente cliente_RUT_key26 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key26" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key26";
       public            Sistema JD_owner    false    220            �           2606    180406    cliente cliente_RUT_key27 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key27" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key27";
       public            Sistema JD_owner    false    220            �           2606    180462    cliente cliente_RUT_key28 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key28" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key28";
       public            Sistema JD_owner    false    220            �           2606    180404    cliente cliente_RUT_key29 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key29" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key29";
       public            Sistema JD_owner    false    220            �           2606    180436    cliente cliente_RUT_key3 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key3" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key3";
       public            Sistema JD_owner    false    220            �           2606    180428    cliente cliente_RUT_key4 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key4" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key4";
       public            Sistema JD_owner    false    220            �           2606    180438    cliente cliente_RUT_key5 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key5" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key5";
       public            Sistema JD_owner    false    220            �           2606    180440    cliente cliente_RUT_key6 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key6" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key6";
       public            Sistema JD_owner    false    220            �           2606    180426    cliente cliente_RUT_key7 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key7" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key7";
       public            Sistema JD_owner    false    220            �           2606    180442    cliente cliente_RUT_key8 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key8" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key8";
       public            Sistema JD_owner    false    220            �           2606    180424    cliente cliente_RUT_key9 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key9" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key9";
       public            Sistema JD_owner    false    220            �           2606    90506 ,   cliente_metodo_pago cliente_metodo_pago_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_pkey PRIMARY KEY ("ID_CLIENTE", "ID_METODO_PAGO");
 V   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_pkey;
       public            Sistema JD_owner    false    223    223            �           2606    90426    cliente cliente_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY ("ID_CLIENTE");
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            Sistema JD_owner    false    220            �           2606    114847    metodo_pago metodo_pago_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.metodo_pago
    ADD CONSTRAINT metodo_pago_pkey PRIMARY KEY ("ID_METODO_PAGO");
 F   ALTER TABLE ONLY public.metodo_pago DROP CONSTRAINT metodo_pago_pkey;
       public            Sistema JD_owner    false    225            �           2606    90501    metodos_pago metodos_pago_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY ("ID_METODO_PAGO");
 H   ALTER TABLE ONLY public.metodos_pago DROP CONSTRAINT metodos_pago_pkey;
       public            Sistema JD_owner    false    222            �           2606    180400    rol rol_NOMBRE_ROL_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "rol_NOMBRE_ROL_key" UNIQUE ("NOMBRE_ROL");
 B   ALTER TABLE ONLY public.rol DROP CONSTRAINT "rol_NOMBRE_ROL_key";
       public            Sistema JD_owner    false    216            �           2606    57385    rol rol_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY ("ID_ROL");
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            Sistema JD_owner    false    216            �           2606    180343 !   usuario usuario_EMAIL_USUARIO_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key" UNIQUE ("EMAIL_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    180345 "   usuario usuario_EMAIL_USUARIO_key1 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key1" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    180339 #   usuario usuario_EMAIL_USUARIO_key10 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key10" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    180361 #   usuario usuario_EMAIL_USUARIO_key11 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key11" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    180363 #   usuario usuario_EMAIL_USUARIO_key12 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key12" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    180365 #   usuario usuario_EMAIL_USUARIO_key13 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key13" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    180367 #   usuario usuario_EMAIL_USUARIO_key14 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key14" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    180337 #   usuario usuario_EMAIL_USUARIO_key15 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key15" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    180369 #   usuario usuario_EMAIL_USUARIO_key16 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key16" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    180371 #   usuario usuario_EMAIL_USUARIO_key17 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key17" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    180335 #   usuario usuario_EMAIL_USUARIO_key18 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key18" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    180333 #   usuario usuario_EMAIL_USUARIO_key19 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key19" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    180347 "   usuario usuario_EMAIL_USUARIO_key2 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key2" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    180373 #   usuario usuario_EMAIL_USUARIO_key20 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key20" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key20";
       public            Sistema JD_owner    false    218            �           2606    180331 #   usuario usuario_EMAIL_USUARIO_key21 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key21" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key21";
       public            Sistema JD_owner    false    218            �           2606    180375 #   usuario usuario_EMAIL_USUARIO_key22 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key22" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key22";
       public            Sistema JD_owner    false    218            �           2606    180329 #   usuario usuario_EMAIL_USUARIO_key23 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key23" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key23";
       public            Sistema JD_owner    false    218            �           2606    180377 #   usuario usuario_EMAIL_USUARIO_key24 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key24" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key24";
       public            Sistema JD_owner    false    218            �           2606    180379 #   usuario usuario_EMAIL_USUARIO_key25 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key25" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key25";
       public            Sistema JD_owner    false    218            �           2606    180327 #   usuario usuario_EMAIL_USUARIO_key26 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key26" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key26";
       public            Sistema JD_owner    false    218            �           2606    180381 #   usuario usuario_EMAIL_USUARIO_key27 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key27" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key27";
       public            Sistema JD_owner    false    218            �           2606    180325 #   usuario usuario_EMAIL_USUARIO_key28 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key28" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key28";
       public            Sistema JD_owner    false    218            �           2606    180323 #   usuario usuario_EMAIL_USUARIO_key29 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key29" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key29";
       public            Sistema JD_owner    false    218            �           2606    180349 "   usuario usuario_EMAIL_USUARIO_key3 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key3" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key3";
       public            Sistema JD_owner    false    218            �           2606    180383 #   usuario usuario_EMAIL_USUARIO_key30 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key30" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key30";
       public            Sistema JD_owner    false    218            �           2606    180321 #   usuario usuario_EMAIL_USUARIO_key31 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key31" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key31";
       public            Sistema JD_owner    false    218            �           2606    180319 #   usuario usuario_EMAIL_USUARIO_key32 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key32" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key32";
       public            Sistema JD_owner    false    218            �           2606    180385 #   usuario usuario_EMAIL_USUARIO_key33 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key33" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key33";
       public            Sistema JD_owner    false    218            �           2606    180317 #   usuario usuario_EMAIL_USUARIO_key34 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key34" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key34";
       public            Sistema JD_owner    false    218            �           2606    180387 #   usuario usuario_EMAIL_USUARIO_key35 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key35" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key35";
       public            Sistema JD_owner    false    218            �           2606    180315 #   usuario usuario_EMAIL_USUARIO_key36 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key36" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key36";
       public            Sistema JD_owner    false    218            �           2606    180389 #   usuario usuario_EMAIL_USUARIO_key37 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key37" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key37";
       public            Sistema JD_owner    false    218            �           2606    180313 #   usuario usuario_EMAIL_USUARIO_key38 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key38" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key38";
       public            Sistema JD_owner    false    218            �           2606    180391 #   usuario usuario_EMAIL_USUARIO_key39 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key39" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key39";
       public            Sistema JD_owner    false    218            �           2606    180351 "   usuario usuario_EMAIL_USUARIO_key4 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key4" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key4";
       public            Sistema JD_owner    false    218            �           2606    180311 #   usuario usuario_EMAIL_USUARIO_key40 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key40" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key40";
       public            Sistema JD_owner    false    218            �           2606    180353 "   usuario usuario_EMAIL_USUARIO_key5 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key5" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key5";
       public            Sistema JD_owner    false    218            �           2606    180341 "   usuario usuario_EMAIL_USUARIO_key6 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key6" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key6";
       public            Sistema JD_owner    false    218            �           2606    180355 "   usuario usuario_EMAIL_USUARIO_key7 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key7" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key7";
       public            Sistema JD_owner    false    218            �           2606    180357 "   usuario usuario_EMAIL_USUARIO_key8 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key8" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key8";
       public            Sistema JD_owner    false    218            �           2606    180359 "   usuario usuario_EMAIL_USUARIO_key9 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key9" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key9";
       public            Sistema JD_owner    false    218            �           2606    180253    usuario usuario_RUT_USUARIO_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key" UNIQUE ("RUT_USUARIO");
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    180255     usuario usuario_RUT_USUARIO_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key1" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    180249 !   usuario usuario_RUT_USUARIO_key10 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key10" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    180271 !   usuario usuario_RUT_USUARIO_key11 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key11" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    180247 !   usuario usuario_RUT_USUARIO_key12 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key12" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    180273 !   usuario usuario_RUT_USUARIO_key13 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key13" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    180281 !   usuario usuario_RUT_USUARIO_key14 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key14" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    180245 !   usuario usuario_RUT_USUARIO_key15 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key15" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    180283 !   usuario usuario_RUT_USUARIO_key16 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key16" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    180285 !   usuario usuario_RUT_USUARIO_key17 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key17" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    180295 !   usuario usuario_RUT_USUARIO_key18 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key18" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    180293 !   usuario usuario_RUT_USUARIO_key19 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key19" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    180257     usuario usuario_RUT_USUARIO_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key2" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    180287 !   usuario usuario_RUT_USUARIO_key20 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key20" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key20";
       public            Sistema JD_owner    false    218                        2606    180289 !   usuario usuario_RUT_USUARIO_key21 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key21" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key21";
       public            Sistema JD_owner    false    218                       2606    180291 !   usuario usuario_RUT_USUARIO_key22 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key22" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key22";
       public            Sistema JD_owner    false    218                       2606    180279 !   usuario usuario_RUT_USUARIO_key23 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key23" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key23";
       public            Sistema JD_owner    false    218                       2606    180275 !   usuario usuario_RUT_USUARIO_key24 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key24" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key24";
       public            Sistema JD_owner    false    218                       2606    180277 !   usuario usuario_RUT_USUARIO_key25 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key25" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key25";
       public            Sistema JD_owner    false    218            
           2606    180243 !   usuario usuario_RUT_USUARIO_key26 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key26" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key26";
       public            Sistema JD_owner    false    218                       2606    180297 !   usuario usuario_RUT_USUARIO_key27 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key27" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key27";
       public            Sistema JD_owner    false    218                       2606    180241 !   usuario usuario_RUT_USUARIO_key28 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key28" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key28";
       public            Sistema JD_owner    false    218                       2606    180239 !   usuario usuario_RUT_USUARIO_key29 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key29" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key29";
       public            Sistema JD_owner    false    218                       2606    180259     usuario usuario_RUT_USUARIO_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key3" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key3";
       public            Sistema JD_owner    false    218                       2606    180299 !   usuario usuario_RUT_USUARIO_key30 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key30" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key30";
       public            Sistema JD_owner    false    218                       2606    180237 !   usuario usuario_RUT_USUARIO_key31 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key31" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key31";
       public            Sistema JD_owner    false    218                       2606    180235 !   usuario usuario_RUT_USUARIO_key32 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key32" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key32";
       public            Sistema JD_owner    false    218                       2606    180301 !   usuario usuario_RUT_USUARIO_key33 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key33" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key33";
       public            Sistema JD_owner    false    218                       2606    180233 !   usuario usuario_RUT_USUARIO_key34 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key34" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key34";
       public            Sistema JD_owner    false    218                       2606    180303 !   usuario usuario_RUT_USUARIO_key35 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key35" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key35";
       public            Sistema JD_owner    false    218                        2606    180231 !   usuario usuario_RUT_USUARIO_key36 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key36" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key36";
       public            Sistema JD_owner    false    218            "           2606    180305 !   usuario usuario_RUT_USUARIO_key37 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key37" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key37";
       public            Sistema JD_owner    false    218            $           2606    180229 !   usuario usuario_RUT_USUARIO_key38 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key38" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key38";
       public            Sistema JD_owner    false    218            &           2606    180307 !   usuario usuario_RUT_USUARIO_key39 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key39" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key39";
       public            Sistema JD_owner    false    218            (           2606    180261     usuario usuario_RUT_USUARIO_key4 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key4" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key4";
       public            Sistema JD_owner    false    218            *           2606    180227 !   usuario usuario_RUT_USUARIO_key40 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key40" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key40";
       public            Sistema JD_owner    false    218            ,           2606    180263     usuario usuario_RUT_USUARIO_key5 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key5" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key5";
       public            Sistema JD_owner    false    218            .           2606    180251     usuario usuario_RUT_USUARIO_key6 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key6" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key6";
       public            Sistema JD_owner    false    218            0           2606    180265     usuario usuario_RUT_USUARIO_key7 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key7" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key7";
       public            Sistema JD_owner    false    218            2           2606    180267     usuario usuario_RUT_USUARIO_key8 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key8" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key8";
       public            Sistema JD_owner    false    218            4           2606    180269     usuario usuario_RUT_USUARIO_key9 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key9" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key9";
       public            Sistema JD_owner    false    218            6           2606    57397    usuario usuario_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY ("ID_USUARIO");
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            Sistema JD_owner    false    218            �           2606    180527 7   cliente_metodo_pago cliente_metodo_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    3504    223    220            �           2606    180532 ;   cliente_metodo_pago cliente_metodo_pago_ID_METODO_PAGO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey" FOREIGN KEY ("ID_METODO_PAGO") REFERENCES public.metodos_pago("ID_METODO_PAGO") ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey";
       public          Sistema JD_owner    false    222    223    3506            �           2606    180392     usuario usuario_ROL_USUARIO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_ROL_USUARIO_fkey" FOREIGN KEY ("ROL_USUARIO") REFERENCES public.rol("ID_ROL") ON UPDATE CASCADE;
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_ROL_USUARIO_fkey";
       public          Sistema JD_owner    false    3216    216    218                       826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false                       826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            N   C  x�]�MN�0�דS��I��k��BWHh�L[K�'r��r'V����l�xc��泂b<VpW7�[�W+���:+��4�Lg��6l=!U؈Ú�� ?ĸ6ܿō9��&����Bl�-$W�,��$KZ�����sT�+�Q��	GeBc���U�J�U�C����H��q2���c���:Aa��ʡ(ugi �X�ߤ��R��5%y.�Z�㰌�a���&��V*ٝ�����B9L�7�
��,M`��9�*������ ��D-�����j�j������m�؛]Gǀ�!�U�Ӹ����>D�5���-���`�U      Q   K   x�3�4�(*MMJT0�4�2�4�q�9���9a\N ׈3$�(+�$Q!%U!���ʔ̒|C#cNS�=... 07c      S      x������ � �      P   �   x�}�;�@Dk�>�z
JgwF�+̆;��	���y�yKjb��B=�!�z�T�+�J����5�{����UOVxM���s���E��	�C��!��t.��}������s� |Z0�D`RN      J   P   x�3�tL����,.)JL�/�2��JMKUHIUN-*�L���2��$��q�p:5�敤r�r�^���������� ��      L   �  x�e��r�0E��W�»�����@;$�;�ll��t3�A���G8��Su��JU��y:x�Y��� �P�R�5�ڻ��e9U�t?&x̢� ��u)+��L�P3������y5L��8U�&ݾ�M�q@l��0�����57
���>ie\�eI�$���� g��>ݟ ]]�4�s*��D��1�Z���+d�p]k.��]$Rl��a���a[��A���� 2Ɣ��`�qhw*w����c���[\S�?W�e#����<�/��<�A��2��޻�sh�1�h�0�>�o|�fY�V�)+�G�jLfh���j�2~�@3t>�]T�O}�<A��joè�ώ��|���9>n֏zÂ���:r<� M���
G��tG��     