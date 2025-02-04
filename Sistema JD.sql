PGDMP  	                    }        
   Sistema JD    16.6    16.4 �              0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    16389 
   Sistema JD    DATABASE     t   CREATE DATABASE "Sistema JD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE "Sistema JD";
                Sistema JD_owner    false                       0    0    DATABASE "Sistema JD"    ACL     6   GRANT ALL ON DATABASE "Sistema JD" TO neon_superuser;
                   Sistema JD_owner    false    4106            �            1259    360470 	   categoria    TABLE     v   CREATE TABLE public.categoria (
    "ID_CATEGORIA" integer NOT NULL,
    "NOMBRE_CATEGORIA" character varying(255)
);
    DROP TABLE public.categoria;
       public         heap    Sistema JD_owner    false            �            1259    360469    categorias_ID_CATEGORIA_seq    SEQUENCE     �   CREATE SEQUENCE public."categorias_ID_CATEGORIA_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."categorias_ID_CATEGORIA_seq";
       public          Sistema JD_owner    false    230                       0    0    categorias_ID_CATEGORIA_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public."categorias_ID_CATEGORIA_seq" OWNED BY public.categoria."ID_CATEGORIA";
          public          Sistema JD_owner    false    229            �            1259    90418    cliente    TABLE     �  CREATE TABLE public.cliente (
    "ID_CLIENTE" integer NOT NULL,
    "CODIGO_CLIENTE" character varying(255),
    "NOMBRE_RAZON_SOCIAL" character varying(255) NOT NULL,
    "NOMBRE_FANTASIA" character varying(255),
    "RUT" character varying(255),
    "GIRO" character varying(255),
    "DIRECCION" character varying(255),
    "CIUDAD" character varying(255),
    "COMUNA" character varying(255),
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
       public          Sistema JD_owner    false    220                       0    0    cliente_ID_CLIENTE_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."cliente_ID_CLIENTE_seq" OWNED BY public.cliente."ID_CLIENTE";
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
       public          Sistema JD_owner    false    223                       0    0    cliente_metodo_pago_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cliente_metodo_pago_id_seq OWNED BY public.cliente_metodo_pago.id;
          public          Sistema JD_owner    false    224            �            1259    229400    contacto_comercial    TABLE     C  CREATE TABLE public.contacto_comercial (
    "ID_CONTACTO_COMERCIAL" integer NOT NULL,
    "ID_CLIENTE" integer NOT NULL,
    "CONTACTO_COMERCIAL" character varying(255),
    "CORREO_ELECTRONICO_COMERCIAL" character varying(255),
    "TELEFONO_FIJO" character varying(255),
    "TELEFONO_CELULAR" character varying(255)
);
 &   DROP TABLE public.contacto_comercial;
       public         heap    Sistema JD_owner    false            �            1259    229399 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE     �   CREATE SEQUENCE public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 E   DROP SEQUENCE public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq";
       public          Sistema JD_owner    false    228                       0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq" OWNED BY public.contacto_comercial."ID_CONTACTO_COMERCIAL";
          public          Sistema JD_owner    false    227            �            1259    229386    informacion_de_pago    TABLE       CREATE TABLE public.informacion_de_pago (
    "ID_INFORMACION" integer NOT NULL,
    "ID_CLIENTE" integer NOT NULL,
    "NOMBRE_RESPONSABLE" character varying(255),
    "CORREO_ELECTRONICO" character varying(255),
    "TELEFONO_RESPONSABLE" character varying(255)
);
 '   DROP TABLE public.informacion_de_pago;
       public         heap    Sistema JD_owner    false            �            1259    229385 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE     �   CREATE SEQUENCE public."informacion_de_pago_ID_INFORMACION_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public."informacion_de_pago_ID_INFORMACION_seq";
       public          Sistema JD_owner    false    226                       0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public."informacion_de_pago_ID_INFORMACION_seq" OWNED BY public.informacion_de_pago."ID_INFORMACION";
          public          Sistema JD_owner    false    225            �            1259    377398    insumo    TABLE     �  CREATE TABLE public.insumo (
    "ID_INSUMO" integer NOT NULL,
    "TIPO_INSUMO" character varying(255),
    "NOMBRE_INSUMO" character varying(255),
    "UBICACION" character varying(255),
    "CANTIDAD" integer,
    "COSTO_UNIDAD" double precision,
    "SUB_TOTAL" double precision,
    "AJUSTE_ACTUAL" double precision,
    "STOCK_DISPONIBLE" integer,
    "PRECIO_NETO" double precision,
    "ESTADO_INSUMO" boolean DEFAULT true,
    "ID_CATEGORIA" integer,
    "PRECIO_VENTA" double precision
);
    DROP TABLE public.insumo;
       public         heap    Sistema JD_owner    false            �            1259    377397    insumo_ID_INSUMO_seq    SEQUENCE     �   CREATE SEQUENCE public."insumo_ID_INSUMO_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."insumo_ID_INSUMO_seq";
       public          Sistema JD_owner    false    232                       0    0    insumo_ID_INSUMO_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."insumo_ID_INSUMO_seq" OWNED BY public.insumo."ID_INSUMO";
          public          Sistema JD_owner    false    231            �            1259    90496    metodos_pago    TABLE     �   CREATE TABLE public.metodos_pago (
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
       public          Sistema JD_owner    false    222                       0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq" OWNED BY public.metodos_pago."ID_METODO_PAGO";
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
       public          Sistema JD_owner    false    216                       0    0    rol_ID_ROL_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."rol_ID_ROL_seq" OWNED BY public.rol."ID_ROL";
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
       public          Sistema JD_owner    false    218                       0    0    usuario_ID_USUARIO_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."usuario_ID_USUARIO_seq" OWNED BY public.usuario."ID_USUARIO";
          public          Sistema JD_owner    false    217            �           2604    360473    categoria ID_CATEGORIA    DEFAULT     �   ALTER TABLE ONLY public.categoria ALTER COLUMN "ID_CATEGORIA" SET DEFAULT nextval('public."categorias_ID_CATEGORIA_seq"'::regclass);
 G   ALTER TABLE public.categoria ALTER COLUMN "ID_CATEGORIA" DROP DEFAULT;
       public          Sistema JD_owner    false    229    230    230            �           2604    90421    cliente ID_CLIENTE    DEFAULT     |   ALTER TABLE ONLY public.cliente ALTER COLUMN "ID_CLIENTE" SET DEFAULT nextval('public."cliente_ID_CLIENTE_seq"'::regclass);
 C   ALTER TABLE public.cliente ALTER COLUMN "ID_CLIENTE" DROP DEFAULT;
       public          Sistema JD_owner    false    220    219    220            �           2604    147656    cliente_metodo_pago id    DEFAULT     �   ALTER TABLE ONLY public.cliente_metodo_pago ALTER COLUMN id SET DEFAULT nextval('public.cliente_metodo_pago_id_seq'::regclass);
 E   ALTER TABLE public.cliente_metodo_pago ALTER COLUMN id DROP DEFAULT;
       public          Sistema JD_owner    false    224    223            �           2604    229403 (   contacto_comercial ID_CONTACTO_COMERCIAL    DEFAULT     �   ALTER TABLE ONLY public.contacto_comercial ALTER COLUMN "ID_CONTACTO_COMERCIAL" SET DEFAULT nextval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"'::regclass);
 Y   ALTER TABLE public.contacto_comercial ALTER COLUMN "ID_CONTACTO_COMERCIAL" DROP DEFAULT;
       public          Sistema JD_owner    false    228    227    228            �           2604    229389 "   informacion_de_pago ID_INFORMACION    DEFAULT     �   ALTER TABLE ONLY public.informacion_de_pago ALTER COLUMN "ID_INFORMACION" SET DEFAULT nextval('public."informacion_de_pago_ID_INFORMACION_seq"'::regclass);
 S   ALTER TABLE public.informacion_de_pago ALTER COLUMN "ID_INFORMACION" DROP DEFAULT;
       public          Sistema JD_owner    false    225    226    226            �           2604    377401    insumo ID_INSUMO    DEFAULT     x   ALTER TABLE ONLY public.insumo ALTER COLUMN "ID_INSUMO" SET DEFAULT nextval('public."insumo_ID_INSUMO_seq"'::regclass);
 A   ALTER TABLE public.insumo ALTER COLUMN "ID_INSUMO" DROP DEFAULT;
       public          Sistema JD_owner    false    232    231    232            �           2604    90499    metodos_pago ID_METODO_PAGO    DEFAULT     �   ALTER TABLE ONLY public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" SET DEFAULT nextval('public."metodos_pago_ID_METODO_PAGO_seq"'::regclass);
 L   ALTER TABLE public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" DROP DEFAULT;
       public          Sistema JD_owner    false    221    222    222            �           2604    57383 
   rol ID_ROL    DEFAULT     l   ALTER TABLE ONLY public.rol ALTER COLUMN "ID_ROL" SET DEFAULT nextval('public."rol_ID_ROL_seq"'::regclass);
 ;   ALTER TABLE public.rol ALTER COLUMN "ID_ROL" DROP DEFAULT;
       public          Sistema JD_owner    false    215    216    216            �           2604    57392    usuario ID_USUARIO    DEFAULT     |   ALTER TABLE ONLY public.usuario ALTER COLUMN "ID_USUARIO" SET DEFAULT nextval('public."usuario_ID_USUARIO_seq"'::regclass);
 C   ALTER TABLE public.usuario ALTER COLUMN "ID_USUARIO" DROP DEFAULT;
       public          Sistema JD_owner    false    218    217    218                      0    360470 	   categoria 
   TABLE DATA           G   COPY public.categoria ("ID_CATEGORIA", "NOMBRE_CATEGORIA") FROM stdin;
    public          Sistema JD_owner    false    230   V8      �          0    90418    cliente 
   TABLE DATA           �   COPY public.cliente ("ID_CLIENTE", "CODIGO_CLIENTE", "NOMBRE_RAZON_SOCIAL", "NOMBRE_FANTASIA", "RUT", "GIRO", "DIRECCION", "CIUDAD", "COMUNA", "CLIENTE_VIGENTE") FROM stdin;
    public          Sistema JD_owner    false    220   �8      �          0    90502    cliente_metodo_pago 
   TABLE DATA           _   COPY public.cliente_metodo_pago ("ID_CLIENTE", "ID_METODO_PAGO", "REFERENCIA", id) FROM stdin;
    public          Sistema JD_owner    false    223   ':                 0    229400    contacto_comercial 
   TABLE DATA           �   COPY public.contacto_comercial ("ID_CONTACTO_COMERCIAL", "ID_CLIENTE", "CONTACTO_COMERCIAL", "CORREO_ELECTRONICO_COMERCIAL", "TELEFONO_FIJO", "TELEFONO_CELULAR") FROM stdin;
    public          Sistema JD_owner    false    228   �:      �          0    229386    informacion_de_pago 
   TABLE DATA           �   COPY public.informacion_de_pago ("ID_INFORMACION", "ID_CLIENTE", "NOMBRE_RESPONSABLE", "CORREO_ELECTRONICO", "TELEFONO_RESPONSABLE") FROM stdin;
    public          Sistema JD_owner    false    226   ;;                0    377398    insumo 
   TABLE DATA           �   COPY public.insumo ("ID_INSUMO", "TIPO_INSUMO", "NOMBRE_INSUMO", "UBICACION", "CANTIDAD", "COSTO_UNIDAD", "SUB_TOTAL", "AJUSTE_ACTUAL", "STOCK_DISPONIBLE", "PRECIO_NETO", "ESTADO_INSUMO", "ID_CATEGORIA", "PRECIO_VENTA") FROM stdin;
    public          Sistema JD_owner    false    232   �;      �          0    90496    metodos_pago 
   TABLE DATA           X   COPY public.metodos_pago ("ID_METODO_PAGO", "NOMBRE_METODO", "DESCRIPCION") FROM stdin;
    public          Sistema JD_owner    false    222   b<      �          0    57380    rol 
   TABLE DATA           5   COPY public.rol ("ID_ROL", "NOMBRE_ROL") FROM stdin;
    public          Sistema JD_owner    false    216   �<      �          0    57389    usuario 
   TABLE DATA           �   COPY public.usuario ("ID_USUARIO", "NOMBRE_USUARIO", "APELLIDO_USUARIO", "RUT_USUARIO", "EMAIL_USUARIO", "CONTRASENIA_USUARIO", "FECHA_NACIMIENTO_USUARIO", "ROL_USUARIO", "ESTADO_USUARIO") FROM stdin;
    public          Sistema JD_owner    false    218   V=                 0    0    categorias_ID_CATEGORIA_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."categorias_ID_CATEGORIA_seq"', 5, true);
          public          Sistema JD_owner    false    229                       0    0    cliente_ID_CLIENTE_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."cliente_ID_CLIENTE_seq"', 30, true);
          public          Sistema JD_owner    false    219                       0    0    cliente_metodo_pago_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.cliente_metodo_pago_id_seq', 26, true);
          public          Sistema JD_owner    false    224                       0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"', 22, true);
          public          Sistema JD_owner    false    227                       0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."informacion_de_pago_ID_INFORMACION_seq"', 19, true);
          public          Sistema JD_owner    false    225                       0    0    insumo_ID_INSUMO_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."insumo_ID_INSUMO_seq"', 17, true);
          public          Sistema JD_owner    false    231                       0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."metodos_pago_ID_METODO_PAGO_seq"', 6, true);
          public          Sistema JD_owner    false    221                       0    0    rol_ID_ROL_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."rol_ID_ROL_seq"', 15, true);
          public          Sistema JD_owner    false    215                       0    0    usuario_ID_USUARIO_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."usuario_ID_USUARIO_seq"', 23, true);
          public          Sistema JD_owner    false    217            3           2606    360475    categoria categorias_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categorias_pkey PRIMARY KEY ("ID_CATEGORIA");
 C   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categorias_pkey;
       public            Sistema JD_owner    false    230            c           2606    459370    cliente cliente_RUT_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key" UNIQUE ("RUT");
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key";
       public            Sistema JD_owner    false    220            e           2606    459372    cliente cliente_RUT_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key1" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key1";
       public            Sistema JD_owner    false    220            g           2606    459268    cliente cliente_RUT_key10 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key10" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key10";
       public            Sistema JD_owner    false    220            i           2606    459270    cliente cliente_RUT_key11 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key11" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key11";
       public            Sistema JD_owner    false    220            k           2606    459330    cliente cliente_RUT_key12 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key12" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key12";
       public            Sistema JD_owner    false    220            m           2606    459274    cliente cliente_RUT_key13 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key13" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key13";
       public            Sistema JD_owner    false    220            o           2606    459278    cliente cliente_RUT_key14 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key14" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key14";
       public            Sistema JD_owner    false    220            q           2606    459328    cliente cliente_RUT_key15 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key15" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key15";
       public            Sistema JD_owner    false    220            s           2606    459280    cliente cliente_RUT_key16 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key16" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key16";
       public            Sistema JD_owner    false    220            u           2606    459316    cliente cliente_RUT_key17 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key17" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key17";
       public            Sistema JD_owner    false    220            w           2606    459314    cliente cliente_RUT_key18 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key18" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key18";
       public            Sistema JD_owner    false    220            y           2606    459312    cliente cliente_RUT_key19 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key19" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key19";
       public            Sistema JD_owner    false    220            {           2606    459374    cliente cliente_RUT_key2 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key2" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key2";
       public            Sistema JD_owner    false    220            }           2606    459282    cliente cliente_RUT_key20 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key20" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key20";
       public            Sistema JD_owner    false    220                       2606    459310    cliente cliente_RUT_key21 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key21" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key21";
       public            Sistema JD_owner    false    220            �           2606    459286    cliente cliente_RUT_key22 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key22" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key22";
       public            Sistema JD_owner    false    220            �           2606    459308    cliente cliente_RUT_key23 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key23" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key23";
       public            Sistema JD_owner    false    220            �           2606    459288    cliente cliente_RUT_key24 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key24" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key24";
       public            Sistema JD_owner    false    220            �           2606    459306    cliente cliente_RUT_key25 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key25" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key25";
       public            Sistema JD_owner    false    220            �           2606    459290    cliente cliente_RUT_key26 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key26" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key26";
       public            Sistema JD_owner    false    220            �           2606    459304    cliente cliente_RUT_key27 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key27" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key27";
       public            Sistema JD_owner    false    220            �           2606    459296    cliente cliente_RUT_key28 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key28" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key28";
       public            Sistema JD_owner    false    220            �           2606    459302    cliente cliente_RUT_key29 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key29" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key29";
       public            Sistema JD_owner    false    220            �           2606    459376    cliente cliente_RUT_key3 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key3" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key3";
       public            Sistema JD_owner    false    220            �           2606    459298    cliente cliente_RUT_key30 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key30" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key30";
       public            Sistema JD_owner    false    220            �           2606    459300    cliente cliente_RUT_key31 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key31" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key31";
       public            Sistema JD_owner    false    220            �           2606    459368    cliente cliente_RUT_key32 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key32" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key32";
       public            Sistema JD_owner    false    220            �           2606    459326    cliente cliente_RUT_key33 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key33" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key33";
       public            Sistema JD_owner    false    220            �           2606    459366    cliente cliente_RUT_key34 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key34" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key34";
       public            Sistema JD_owner    false    220            �           2606    459276    cliente cliente_RUT_key35 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key35" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key35";
       public            Sistema JD_owner    false    220            �           2606    459340    cliente cliente_RUT_key36 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key36" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key36";
       public            Sistema JD_owner    false    220            �           2606    459324    cliente cliente_RUT_key37 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key37" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key37";
       public            Sistema JD_owner    false    220            �           2606    459318    cliente cliente_RUT_key38 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key38" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key38";
       public            Sistema JD_owner    false    220            �           2606    459322    cliente cliente_RUT_key39 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key39" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key39";
       public            Sistema JD_owner    false    220            �           2606    459336    cliente cliente_RUT_key4 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key4" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key4";
       public            Sistema JD_owner    false    220            �           2606    459320    cliente cliente_RUT_key40 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key40" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key40";
       public            Sistema JD_owner    false    220            �           2606    459284    cliente cliente_RUT_key41 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key41" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key41";
       public            Sistema JD_owner    false    220            �           2606    459358    cliente cliente_RUT_key42 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key42" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key42";
       public            Sistema JD_owner    false    220            �           2606    459294    cliente cliente_RUT_key43 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key43" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key43";
       public            Sistema JD_owner    false    220            �           2606    459378    cliente cliente_RUT_key44 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key44" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key44";
       public            Sistema JD_owner    false    220            �           2606    459356    cliente cliente_RUT_key45 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key45" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key45";
       public            Sistema JD_owner    false    220            �           2606    459380    cliente cliente_RUT_key46 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key46" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key46";
       public            Sistema JD_owner    false    220            �           2606    459354    cliente cliente_RUT_key47 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key47" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key47";
       public            Sistema JD_owner    false    220            �           2606    459382    cliente cliente_RUT_key48 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key48" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key48";
       public            Sistema JD_owner    false    220            �           2606    459352    cliente cliente_RUT_key49 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key49" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key49";
       public            Sistema JD_owner    false    220            �           2606    459360    cliente cliente_RUT_key5 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key5" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key5";
       public            Sistema JD_owner    false    220            �           2606    459384    cliente cliente_RUT_key50 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key50" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key50";
       public            Sistema JD_owner    false    220            �           2606    459386    cliente cliente_RUT_key51 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key51" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key51";
       public            Sistema JD_owner    false    220            �           2606    459350    cliente cliente_RUT_key52 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key52" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key52";
       public            Sistema JD_owner    false    220            �           2606    459388    cliente cliente_RUT_key53 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key53" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key53";
       public            Sistema JD_owner    false    220            �           2606    459348    cliente cliente_RUT_key54 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key54" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key54";
       public            Sistema JD_owner    false    220            �           2606    459346    cliente cliente_RUT_key55 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key55" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key55";
       public            Sistema JD_owner    false    220            �           2606    459344    cliente cliente_RUT_key56 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key56" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key56";
       public            Sistema JD_owner    false    220            �           2606    459390    cliente cliente_RUT_key57 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key57" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key57";
       public            Sistema JD_owner    false    220            �           2606    459342    cliente cliente_RUT_key58 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key58" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key58";
       public            Sistema JD_owner    false    220            �           2606    459392    cliente cliente_RUT_key59 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key59" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key59";
       public            Sistema JD_owner    false    220            �           2606    459362    cliente cliente_RUT_key6 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key6" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key6";
       public            Sistema JD_owner    false    220            �           2606    459266    cliente cliente_RUT_key60 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key60" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key60";
       public            Sistema JD_owner    false    220            �           2606    459394    cliente cliente_RUT_key61 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key61" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key61";
       public            Sistema JD_owner    false    220            �           2606    459264    cliente cliente_RUT_key62 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key62" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key62";
       public            Sistema JD_owner    false    220            �           2606    459396    cliente cliente_RUT_key63 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key63" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key63";
       public            Sistema JD_owner    false    220            �           2606    459262    cliente cliente_RUT_key64 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key64" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key64";
       public            Sistema JD_owner    false    220            �           2606    459398    cliente cliente_RUT_key65 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key65" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key65";
       public            Sistema JD_owner    false    220            �           2606    459260    cliente cliente_RUT_key66 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key66" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key66";
       public            Sistema JD_owner    false    220            �           2606    459400    cliente cliente_RUT_key67 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key67" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key67";
       public            Sistema JD_owner    false    220            �           2606    459258    cliente cliente_RUT_key68 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key68" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key68";
       public            Sistema JD_owner    false    220            �           2606    459256    cliente cliente_RUT_key69 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key69" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key69";
       public            Sistema JD_owner    false    220            �           2606    459334    cliente cliente_RUT_key7 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key7" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key7";
       public            Sistema JD_owner    false    220            �           2606    459338    cliente cliente_RUT_key70 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key70" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key70";
       public            Sistema JD_owner    false    220            �           2606    459402    cliente cliente_RUT_key71 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key71" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key71";
       public            Sistema JD_owner    false    220            �           2606    459254    cliente cliente_RUT_key72 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key72" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key72";
       public            Sistema JD_owner    false    220            �           2606    459272    cliente cliente_RUT_key73 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key73" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key73";
       public            Sistema JD_owner    false    220            �           2606    459252    cliente cliente_RUT_key74 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key74" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key74";
       public            Sistema JD_owner    false    220            �           2606    459404    cliente cliente_RUT_key75 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key75" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key75";
       public            Sistema JD_owner    false    220            �           2606    459250    cliente cliente_RUT_key76 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key76" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key76";
       public            Sistema JD_owner    false    220            �           2606    459406    cliente cliente_RUT_key77 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key77" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key77";
       public            Sistema JD_owner    false    220            �           2606    459248    cliente cliente_RUT_key78 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key78" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key78";
       public            Sistema JD_owner    false    220            �           2606    459216    cliente cliente_RUT_key79 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key79" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key79";
       public            Sistema JD_owner    false    220            �           2606    459364    cliente cliente_RUT_key8 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key8" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key8";
       public            Sistema JD_owner    false    220                       2606    459246    cliente cliente_RUT_key80 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key80" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key80";
       public            Sistema JD_owner    false    220                       2606    459218    cliente cliente_RUT_key81 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key81" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key81";
       public            Sistema JD_owner    false    220                       2606    459244    cliente cliente_RUT_key82 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key82" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key82";
       public            Sistema JD_owner    false    220                       2606    459220    cliente cliente_RUT_key83 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key83" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key83";
       public            Sistema JD_owner    false    220            	           2606    459242    cliente cliente_RUT_key84 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key84" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key84";
       public            Sistema JD_owner    false    220                       2606    459222    cliente cliente_RUT_key85 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key85" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key85";
       public            Sistema JD_owner    false    220                       2606    459240    cliente cliente_RUT_key86 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key86" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key86";
       public            Sistema JD_owner    false    220                       2606    459224    cliente cliente_RUT_key87 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key87" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key87";
       public            Sistema JD_owner    false    220                       2606    459238    cliente cliente_RUT_key88 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key88" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key88";
       public            Sistema JD_owner    false    220                       2606    459226    cliente cliente_RUT_key89 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key89" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key89";
       public            Sistema JD_owner    false    220                       2606    459332    cliente cliente_RUT_key9 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key9" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key9";
       public            Sistema JD_owner    false    220                       2606    459236    cliente cliente_RUT_key90 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key90" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key90";
       public            Sistema JD_owner    false    220                       2606    459228    cliente cliente_RUT_key91 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key91" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key91";
       public            Sistema JD_owner    false    220                       2606    459234    cliente cliente_RUT_key92 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key92" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key92";
       public            Sistema JD_owner    false    220                       2606    459230    cliente cliente_RUT_key93 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key93" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key93";
       public            Sistema JD_owner    false    220                       2606    459232    cliente cliente_RUT_key94 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key94" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key94";
       public            Sistema JD_owner    false    220            !           2606    459292    cliente cliente_RUT_key95 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key95" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key95";
       public            Sistema JD_owner    false    220            #           2606    459214    cliente cliente_RUT_key96 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key96" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key96";
       public            Sistema JD_owner    false    220            %           2606    459408    cliente cliente_RUT_key97 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key97" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key97";
       public            Sistema JD_owner    false    220            '           2606    459212    cliente cliente_RUT_key98 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key98" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key98";
       public            Sistema JD_owner    false    220            -           2606    90506 ,   cliente_metodo_pago cliente_metodo_pago_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_pkey PRIMARY KEY ("ID_CLIENTE", "ID_METODO_PAGO");
 V   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_pkey;
       public            Sistema JD_owner    false    223    223            )           2606    90426    cliente cliente_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY ("ID_CLIENTE");
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            Sistema JD_owner    false    220            1           2606    229407 *   contacto_comercial contacto_comercial_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT contacto_comercial_pkey PRIMARY KEY ("ID_CONTACTO_COMERCIAL");
 T   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT contacto_comercial_pkey;
       public            Sistema JD_owner    false    228            /           2606    229393 ,   informacion_de_pago informacion_de_pago_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT informacion_de_pago_pkey PRIMARY KEY ("ID_INFORMACION");
 V   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT informacion_de_pago_pkey;
       public            Sistema JD_owner    false    226            5           2606    459454    insumo insumo_NOMBRE_INSUMO_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key" UNIQUE ("NOMBRE_INSUMO");
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key";
       public            Sistema JD_owner    false    232            7           2606    459452     insumo insumo_NOMBRE_INSUMO_key1 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key1" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key1";
       public            Sistema JD_owner    false    232            9           2606    459464 !   insumo insumo_NOMBRE_INSUMO_key10 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key10" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key10";
       public            Sistema JD_owner    false    232            ;           2606    459440 !   insumo insumo_NOMBRE_INSUMO_key11 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key11" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key11";
       public            Sistema JD_owner    false    232            =           2606    459466 !   insumo insumo_NOMBRE_INSUMO_key12 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key12" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key12";
       public            Sistema JD_owner    false    232            ?           2606    459438 !   insumo insumo_NOMBRE_INSUMO_key13 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key13" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key13";
       public            Sistema JD_owner    false    232            A           2606    459436 !   insumo insumo_NOMBRE_INSUMO_key14 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key14" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key14";
       public            Sistema JD_owner    false    232            C           2606    459468 !   insumo insumo_NOMBRE_INSUMO_key15 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key15" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key15";
       public            Sistema JD_owner    false    232            E           2606    459470 !   insumo insumo_NOMBRE_INSUMO_key16 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key16" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key16";
       public            Sistema JD_owner    false    232            G           2606    459444 !   insumo insumo_NOMBRE_INSUMO_key17 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key17" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key17";
       public            Sistema JD_owner    false    232            I           2606    459472 !   insumo insumo_NOMBRE_INSUMO_key18 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key18" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key18";
       public            Sistema JD_owner    false    232            K           2606    459434 !   insumo insumo_NOMBRE_INSUMO_key19 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key19" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key19";
       public            Sistema JD_owner    false    232            M           2606    459456     insumo insumo_NOMBRE_INSUMO_key2 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key2" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key2";
       public            Sistema JD_owner    false    232            O           2606    459450     insumo insumo_NOMBRE_INSUMO_key3 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key3" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key3";
       public            Sistema JD_owner    false    232            Q           2606    459458     insumo insumo_NOMBRE_INSUMO_key4 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key4" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key4";
       public            Sistema JD_owner    false    232            S           2606    459448     insumo insumo_NOMBRE_INSUMO_key5 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key5" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key5";
       public            Sistema JD_owner    false    232            U           2606    459460     insumo insumo_NOMBRE_INSUMO_key6 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key6" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key6";
       public            Sistema JD_owner    false    232            W           2606    459446     insumo insumo_NOMBRE_INSUMO_key7 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key7" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key7";
       public            Sistema JD_owner    false    232            Y           2606    459462     insumo insumo_NOMBRE_INSUMO_key8 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key8" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key8";
       public            Sistema JD_owner    false    232            [           2606    459442     insumo insumo_NOMBRE_INSUMO_key9 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key9" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key9";
       public            Sistema JD_owner    false    232            ]           2606    377406    insumo insumo_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_pkey PRIMARY KEY ("ID_INSUMO");
 <   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_pkey;
       public            Sistema JD_owner    false    232            +           2606    90501    metodos_pago metodos_pago_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY ("ID_METODO_PAGO");
 H   ALTER TABLE ONLY public.metodos_pago DROP CONSTRAINT metodos_pago_pkey;
       public            Sistema JD_owner    false    222            �           2606    459208    rol rol_NOMBRE_ROL_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "rol_NOMBRE_ROL_key" UNIQUE ("NOMBRE_ROL");
 B   ALTER TABLE ONLY public.rol DROP CONSTRAINT "rol_NOMBRE_ROL_key";
       public            Sistema JD_owner    false    216            �           2606    57385    rol rol_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY ("ID_ROL");
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            Sistema JD_owner    false    216            �           2606    459097 !   usuario usuario_EMAIL_USUARIO_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key" UNIQUE ("EMAIL_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    459115 "   usuario usuario_EMAIL_USUARIO_key1 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key1" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    459073 #   usuario usuario_EMAIL_USUARIO_key10 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key10" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    458989 $   usuario usuario_EMAIL_USUARIO_key100 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key100" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key100";
       public            Sistema JD_owner    false    218            �           2606    459191 $   usuario usuario_EMAIL_USUARIO_key101 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key101" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key101";
       public            Sistema JD_owner    false    218            �           2606    458987 $   usuario usuario_EMAIL_USUARIO_key102 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key102" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key102";
       public            Sistema JD_owner    false    218            �           2606    459193 $   usuario usuario_EMAIL_USUARIO_key103 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key103" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key103";
       public            Sistema JD_owner    false    218            �           2606    458985 $   usuario usuario_EMAIL_USUARIO_key104 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key104" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key104";
       public            Sistema JD_owner    false    218            �           2606    459195 $   usuario usuario_EMAIL_USUARIO_key105 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key105" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key105";
       public            Sistema JD_owner    false    218            �           2606    458983 $   usuario usuario_EMAIL_USUARIO_key106 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key106" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key106";
       public            Sistema JD_owner    false    218            �           2606    459197 $   usuario usuario_EMAIL_USUARIO_key107 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key107" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key107";
       public            Sistema JD_owner    false    218            �           2606    458981 $   usuario usuario_EMAIL_USUARIO_key108 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key108" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key108";
       public            Sistema JD_owner    false    218            �           2606    459199 $   usuario usuario_EMAIL_USUARIO_key109 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key109" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key109";
       public            Sistema JD_owner    false    218            �           2606    459131 #   usuario usuario_EMAIL_USUARIO_key11 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key11" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    458979 $   usuario usuario_EMAIL_USUARIO_key110 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key110" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key110";
       public            Sistema JD_owner    false    218            �           2606    459133 #   usuario usuario_EMAIL_USUARIO_key12 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key12" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    459135 #   usuario usuario_EMAIL_USUARIO_key13 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key13" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    459137 #   usuario usuario_EMAIL_USUARIO_key14 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key14" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    459071 #   usuario usuario_EMAIL_USUARIO_key15 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key15" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    459139 #   usuario usuario_EMAIL_USUARIO_key16 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key16" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    459141 #   usuario usuario_EMAIL_USUARIO_key17 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key17" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    459069 #   usuario usuario_EMAIL_USUARIO_key18 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key18" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    459067 #   usuario usuario_EMAIL_USUARIO_key19 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key19" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    459117 "   usuario usuario_EMAIL_USUARIO_key2 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key2" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    459143 #   usuario usuario_EMAIL_USUARIO_key20 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key20" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key20";
       public            Sistema JD_owner    false    218            �           2606    459065 #   usuario usuario_EMAIL_USUARIO_key21 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key21" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key21";
       public            Sistema JD_owner    false    218            �           2606    459145 #   usuario usuario_EMAIL_USUARIO_key22 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key22" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key22";
       public            Sistema JD_owner    false    218            �           2606    459063 #   usuario usuario_EMAIL_USUARIO_key23 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key23" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key23";
       public            Sistema JD_owner    false    218            �           2606    459147 #   usuario usuario_EMAIL_USUARIO_key24 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key24" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key24";
       public            Sistema JD_owner    false    218            �           2606    459149 #   usuario usuario_EMAIL_USUARIO_key25 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key25" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key25";
       public            Sistema JD_owner    false    218            �           2606    459059 #   usuario usuario_EMAIL_USUARIO_key26 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key26" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key26";
       public            Sistema JD_owner    false    218            �           2606    459151 #   usuario usuario_EMAIL_USUARIO_key27 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key27" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key27";
       public            Sistema JD_owner    false    218            �           2606    459057 #   usuario usuario_EMAIL_USUARIO_key28 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key28" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key28";
       public            Sistema JD_owner    false    218            �           2606    459055 #   usuario usuario_EMAIL_USUARIO_key29 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key29" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key29";
       public            Sistema JD_owner    false    218            �           2606    459119 "   usuario usuario_EMAIL_USUARIO_key3 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key3" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key3";
       public            Sistema JD_owner    false    218            �           2606    459153 #   usuario usuario_EMAIL_USUARIO_key30 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key30" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key30";
       public            Sistema JD_owner    false    218            �           2606    459053 #   usuario usuario_EMAIL_USUARIO_key31 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key31" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key31";
       public            Sistema JD_owner    false    218            �           2606    459051 #   usuario usuario_EMAIL_USUARIO_key32 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key32" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key32";
       public            Sistema JD_owner    false    218            �           2606    458993 #   usuario usuario_EMAIL_USUARIO_key33 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key33" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key33";
       public            Sistema JD_owner    false    218            �           2606    459049 #   usuario usuario_EMAIL_USUARIO_key34 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key34" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key34";
       public            Sistema JD_owner    false    218            �           2606    458995 #   usuario usuario_EMAIL_USUARIO_key35 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key35" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key35";
       public            Sistema JD_owner    false    218            �           2606    459011 #   usuario usuario_EMAIL_USUARIO_key36 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key36" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key36";
       public            Sistema JD_owner    false    218            �           2606    458997 #   usuario usuario_EMAIL_USUARIO_key37 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key37" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key37";
       public            Sistema JD_owner    false    218            �           2606    459009 #   usuario usuario_EMAIL_USUARIO_key38 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key38" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key38";
       public            Sistema JD_owner    false    218            �           2606    458999 #   usuario usuario_EMAIL_USUARIO_key39 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key39" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key39";
       public            Sistema JD_owner    false    218            �           2606    459121 "   usuario usuario_EMAIL_USUARIO_key4 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key4" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key4";
       public            Sistema JD_owner    false    218                       2606    459007 #   usuario usuario_EMAIL_USUARIO_key40 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key40" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key40";
       public            Sistema JD_owner    false    218                       2606    459001 #   usuario usuario_EMAIL_USUARIO_key41 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key41" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key41";
       public            Sistema JD_owner    false    218                       2606    459005 #   usuario usuario_EMAIL_USUARIO_key42 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key42" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key42";
       public            Sistema JD_owner    false    218                       2606    459003 #   usuario usuario_EMAIL_USUARIO_key43 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key43" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key43";
       public            Sistema JD_owner    false    218            	           2606    459161 #   usuario usuario_EMAIL_USUARIO_key44 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key44" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key44";
       public            Sistema JD_owner    false    218                       2606    459155 #   usuario usuario_EMAIL_USUARIO_key45 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key45" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key45";
       public            Sistema JD_owner    false    218                       2606    459159 #   usuario usuario_EMAIL_USUARIO_key46 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key46" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key46";
       public            Sistema JD_owner    false    218                       2606    459157 #   usuario usuario_EMAIL_USUARIO_key47 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key47" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key47";
       public            Sistema JD_owner    false    218                       2606    459061 #   usuario usuario_EMAIL_USUARIO_key48 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key48" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key48";
       public            Sistema JD_owner    false    218                       2606    459013 #   usuario usuario_EMAIL_USUARIO_key49 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key49" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key49";
       public            Sistema JD_owner    false    218                       2606    459123 "   usuario usuario_EMAIL_USUARIO_key5 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key5" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key5";
       public            Sistema JD_owner    false    218                       2606    459047 #   usuario usuario_EMAIL_USUARIO_key50 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key50" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key50";
       public            Sistema JD_owner    false    218                       2606    459015 #   usuario usuario_EMAIL_USUARIO_key51 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key51" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key51";
       public            Sistema JD_owner    false    218                       2606    459045 #   usuario usuario_EMAIL_USUARIO_key52 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key52" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key52";
       public            Sistema JD_owner    false    218                       2606    459017 #   usuario usuario_EMAIL_USUARIO_key53 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key53" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key53";
       public            Sistema JD_owner    false    218                       2606    459043 #   usuario usuario_EMAIL_USUARIO_key54 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key54" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key54";
       public            Sistema JD_owner    false    218            !           2606    459019 #   usuario usuario_EMAIL_USUARIO_key55 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key55" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key55";
       public            Sistema JD_owner    false    218            #           2606    459041 #   usuario usuario_EMAIL_USUARIO_key56 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key56" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key56";
       public            Sistema JD_owner    false    218            %           2606    459021 #   usuario usuario_EMAIL_USUARIO_key57 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key57" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key57";
       public            Sistema JD_owner    false    218            '           2606    459039 #   usuario usuario_EMAIL_USUARIO_key58 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key58" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key58";
       public            Sistema JD_owner    false    218            )           2606    459023 #   usuario usuario_EMAIL_USUARIO_key59 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key59" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key59";
       public            Sistema JD_owner    false    218            +           2606    459075 "   usuario usuario_EMAIL_USUARIO_key6 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key6" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key6";
       public            Sistema JD_owner    false    218            -           2606    459037 #   usuario usuario_EMAIL_USUARIO_key60 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key60" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key60";
       public            Sistema JD_owner    false    218            /           2606    459025 #   usuario usuario_EMAIL_USUARIO_key61 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key61" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key61";
       public            Sistema JD_owner    false    218            1           2606    459027 #   usuario usuario_EMAIL_USUARIO_key62 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key62" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key62";
       public            Sistema JD_owner    false    218            3           2606    459035 #   usuario usuario_EMAIL_USUARIO_key63 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key63" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key63";
       public            Sistema JD_owner    false    218            5           2606    459029 #   usuario usuario_EMAIL_USUARIO_key64 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key64" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key64";
       public            Sistema JD_owner    false    218            7           2606    459033 #   usuario usuario_EMAIL_USUARIO_key65 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key65" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key65";
       public            Sistema JD_owner    false    218            9           2606    459031 #   usuario usuario_EMAIL_USUARIO_key66 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key66" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key66";
       public            Sistema JD_owner    false    218            ;           2606    459173 #   usuario usuario_EMAIL_USUARIO_key67 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key67" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key67";
       public            Sistema JD_owner    false    218            =           2606    459163 #   usuario usuario_EMAIL_USUARIO_key68 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key68" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key68";
       public            Sistema JD_owner    false    218            ?           2606    459171 #   usuario usuario_EMAIL_USUARIO_key69 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key69" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key69";
       public            Sistema JD_owner    false    218            A           2606    459125 "   usuario usuario_EMAIL_USUARIO_key7 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key7" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key7";
       public            Sistema JD_owner    false    218            C           2606    459165 #   usuario usuario_EMAIL_USUARIO_key70 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key70" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key70";
       public            Sistema JD_owner    false    218            E           2606    459169 #   usuario usuario_EMAIL_USUARIO_key71 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key71" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key71";
       public            Sistema JD_owner    false    218            G           2606    459099 #   usuario usuario_EMAIL_USUARIO_key72 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key72" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key72";
       public            Sistema JD_owner    false    218            I           2606    459167 #   usuario usuario_EMAIL_USUARIO_key73 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key73" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key73";
       public            Sistema JD_owner    false    218            K           2606    459101 #   usuario usuario_EMAIL_USUARIO_key74 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key74" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key74";
       public            Sistema JD_owner    false    218            M           2606    459113 #   usuario usuario_EMAIL_USUARIO_key75 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key75" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key75";
       public            Sistema JD_owner    false    218            O           2606    459103 #   usuario usuario_EMAIL_USUARIO_key76 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key76" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key76";
       public            Sistema JD_owner    false    218            Q           2606    459111 #   usuario usuario_EMAIL_USUARIO_key77 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key77" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key77";
       public            Sistema JD_owner    false    218            S           2606    459105 #   usuario usuario_EMAIL_USUARIO_key78 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key78" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key78";
       public            Sistema JD_owner    false    218            U           2606    459109 #   usuario usuario_EMAIL_USUARIO_key79 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key79" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key79";
       public            Sistema JD_owner    false    218            W           2606    459127 "   usuario usuario_EMAIL_USUARIO_key8 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key8" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key8";
       public            Sistema JD_owner    false    218            Y           2606    459107 #   usuario usuario_EMAIL_USUARIO_key80 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key80" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key80";
       public            Sistema JD_owner    false    218            [           2606    459095 #   usuario usuario_EMAIL_USUARIO_key81 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key81" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key81";
       public            Sistema JD_owner    false    218            ]           2606    459077 #   usuario usuario_EMAIL_USUARIO_key82 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key82" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key82";
       public            Sistema JD_owner    false    218            _           2606    459093 #   usuario usuario_EMAIL_USUARIO_key83 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key83" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key83";
       public            Sistema JD_owner    false    218            a           2606    459079 #   usuario usuario_EMAIL_USUARIO_key84 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key84" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key84";
       public            Sistema JD_owner    false    218            c           2606    459091 #   usuario usuario_EMAIL_USUARIO_key85 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key85" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key85";
       public            Sistema JD_owner    false    218            e           2606    459175 #   usuario usuario_EMAIL_USUARIO_key86 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key86" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key86";
       public            Sistema JD_owner    false    218            g           2606    459177 #   usuario usuario_EMAIL_USUARIO_key87 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key87" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key87";
       public            Sistema JD_owner    false    218            i           2606    459089 #   usuario usuario_EMAIL_USUARIO_key88 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key88" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key88";
       public            Sistema JD_owner    false    218            k           2606    459179 #   usuario usuario_EMAIL_USUARIO_key89 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key89" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key89";
       public            Sistema JD_owner    false    218            m           2606    459129 "   usuario usuario_EMAIL_USUARIO_key9 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key9" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key9";
       public            Sistema JD_owner    false    218            o           2606    459087 #   usuario usuario_EMAIL_USUARIO_key90 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key90" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key90";
       public            Sistema JD_owner    false    218            q           2606    459181 #   usuario usuario_EMAIL_USUARIO_key91 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key91" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key91";
       public            Sistema JD_owner    false    218            s           2606    459085 #   usuario usuario_EMAIL_USUARIO_key92 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key92" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key92";
       public            Sistema JD_owner    false    218            u           2606    459183 #   usuario usuario_EMAIL_USUARIO_key93 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key93" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key93";
       public            Sistema JD_owner    false    218            w           2606    459083 #   usuario usuario_EMAIL_USUARIO_key94 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key94" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key94";
       public            Sistema JD_owner    false    218            y           2606    459185 #   usuario usuario_EMAIL_USUARIO_key95 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key95" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key95";
       public            Sistema JD_owner    false    218            {           2606    459081 #   usuario usuario_EMAIL_USUARIO_key96 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key96" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key96";
       public            Sistema JD_owner    false    218            }           2606    459187 #   usuario usuario_EMAIL_USUARIO_key97 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key97" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key97";
       public            Sistema JD_owner    false    218                       2606    458991 #   usuario usuario_EMAIL_USUARIO_key98 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key98" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key98";
       public            Sistema JD_owner    false    218            �           2606    459189 #   usuario usuario_EMAIL_USUARIO_key99 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key99" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key99";
       public            Sistema JD_owner    false    218            �           2606    458915    usuario usuario_RUT_USUARIO_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key" UNIQUE ("RUT_USUARIO");
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    458917     usuario usuario_RUT_USUARIO_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key1" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    458911 !   usuario usuario_RUT_USUARIO_key10 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key10" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    458773 "   usuario usuario_RUT_USUARIO_key100 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key100" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key100";
       public            Sistema JD_owner    false    218            �           2606    458771 "   usuario usuario_RUT_USUARIO_key101 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key101" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key101";
       public            Sistema JD_owner    false    218            �           2606    458769 "   usuario usuario_RUT_USUARIO_key102 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key102" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key102";
       public            Sistema JD_owner    false    218            �           2606    458767 "   usuario usuario_RUT_USUARIO_key103 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key103" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key103";
       public            Sistema JD_owner    false    218            �           2606    458765 "   usuario usuario_RUT_USUARIO_key104 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key104" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key104";
       public            Sistema JD_owner    false    218            �           2606    458975 "   usuario usuario_RUT_USUARIO_key105 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key105" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key105";
       public            Sistema JD_owner    false    218            �           2606    458763 "   usuario usuario_RUT_USUARIO_key106 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key106" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key106";
       public            Sistema JD_owner    false    218            �           2606    458761 "   usuario usuario_RUT_USUARIO_key107 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key107" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key107";
       public            Sistema JD_owner    false    218            �           2606    458759 "   usuario usuario_RUT_USUARIO_key108 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key108" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key108";
       public            Sistema JD_owner    false    218            �           2606    458757 "   usuario usuario_RUT_USUARIO_key109 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key109" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key109";
       public            Sistema JD_owner    false    218            �           2606    458933 !   usuario usuario_RUT_USUARIO_key11 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key11" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    458755 "   usuario usuario_RUT_USUARIO_key110 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key110" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key110";
       public            Sistema JD_owner    false    218            �           2606    458909 !   usuario usuario_RUT_USUARIO_key12 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key12" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    458935 !   usuario usuario_RUT_USUARIO_key13 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key13" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    458943 !   usuario usuario_RUT_USUARIO_key14 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key14" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    458907 !   usuario usuario_RUT_USUARIO_key15 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key15" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    458945 !   usuario usuario_RUT_USUARIO_key16 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key16" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    458947 !   usuario usuario_RUT_USUARIO_key17 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key17" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    458957 !   usuario usuario_RUT_USUARIO_key18 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key18" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    458955 !   usuario usuario_RUT_USUARIO_key19 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key19" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    458919     usuario usuario_RUT_USUARIO_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key2" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    458949 !   usuario usuario_RUT_USUARIO_key20 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key20" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key20";
       public            Sistema JD_owner    false    218            �           2606    458951 !   usuario usuario_RUT_USUARIO_key21 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key21" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key21";
       public            Sistema JD_owner    false    218            �           2606    458953 !   usuario usuario_RUT_USUARIO_key22 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key22" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key22";
       public            Sistema JD_owner    false    218            �           2606    458941 !   usuario usuario_RUT_USUARIO_key23 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key23" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key23";
       public            Sistema JD_owner    false    218            �           2606    458937 !   usuario usuario_RUT_USUARIO_key24 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key24" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key24";
       public            Sistema JD_owner    false    218            �           2606    458939 !   usuario usuario_RUT_USUARIO_key25 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key25" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key25";
       public            Sistema JD_owner    false    218            �           2606    458905 !   usuario usuario_RUT_USUARIO_key26 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key26" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key26";
       public            Sistema JD_owner    false    218            �           2606    458959 !   usuario usuario_RUT_USUARIO_key27 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key27" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key27";
       public            Sistema JD_owner    false    218            �           2606    458903 !   usuario usuario_RUT_USUARIO_key28 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key28" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key28";
       public            Sistema JD_owner    false    218            �           2606    458901 !   usuario usuario_RUT_USUARIO_key29 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key29" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key29";
       public            Sistema JD_owner    false    218            �           2606    458921     usuario usuario_RUT_USUARIO_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key3" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key3";
       public            Sistema JD_owner    false    218            �           2606    458819 !   usuario usuario_RUT_USUARIO_key30 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key30" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key30";
       public            Sistema JD_owner    false    218            �           2606    458899 !   usuario usuario_RUT_USUARIO_key31 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key31" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key31";
       public            Sistema JD_owner    false    218            �           2606    458897 !   usuario usuario_RUT_USUARIO_key32 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key32" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key32";
       public            Sistema JD_owner    false    218            �           2606    458821 !   usuario usuario_RUT_USUARIO_key33 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key33" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key33";
       public            Sistema JD_owner    false    218            �           2606    458895 !   usuario usuario_RUT_USUARIO_key34 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key34" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key34";
       public            Sistema JD_owner    false    218            �           2606    458823 !   usuario usuario_RUT_USUARIO_key35 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key35" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key35";
       public            Sistema JD_owner    false    218            �           2606    458893 !   usuario usuario_RUT_USUARIO_key36 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key36" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key36";
       public            Sistema JD_owner    false    218            �           2606    458825 !   usuario usuario_RUT_USUARIO_key37 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key37" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key37";
       public            Sistema JD_owner    false    218            �           2606    458891 !   usuario usuario_RUT_USUARIO_key38 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key38" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key38";
       public            Sistema JD_owner    false    218            �           2606    458827 !   usuario usuario_RUT_USUARIO_key39 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key39" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key39";
       public            Sistema JD_owner    false    218            �           2606    458923     usuario usuario_RUT_USUARIO_key4 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key4" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key4";
       public            Sistema JD_owner    false    218            �           2606    458889 !   usuario usuario_RUT_USUARIO_key40 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key40" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key40";
       public            Sistema JD_owner    false    218            �           2606    458829 !   usuario usuario_RUT_USUARIO_key41 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key41" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key41";
       public            Sistema JD_owner    false    218            �           2606    458887 !   usuario usuario_RUT_USUARIO_key42 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key42" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key42";
       public            Sistema JD_owner    false    218            �           2606    458831 !   usuario usuario_RUT_USUARIO_key43 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key43" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key43";
       public            Sistema JD_owner    false    218            �           2606    458885 !   usuario usuario_RUT_USUARIO_key44 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key44" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key44";
       public            Sistema JD_owner    false    218            �           2606    458833 !   usuario usuario_RUT_USUARIO_key45 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key45" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key45";
       public            Sistema JD_owner    false    218            �           2606    458883 !   usuario usuario_RUT_USUARIO_key46 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key46" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key46";
       public            Sistema JD_owner    false    218            �           2606    458835 !   usuario usuario_RUT_USUARIO_key47 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key47" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key47";
       public            Sistema JD_owner    false    218            �           2606    458881 !   usuario usuario_RUT_USUARIO_key48 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key48" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key48";
       public            Sistema JD_owner    false    218            �           2606    458837 !   usuario usuario_RUT_USUARIO_key49 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key49" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key49";
       public            Sistema JD_owner    false    218            �           2606    458925     usuario usuario_RUT_USUARIO_key5 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key5" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key5";
       public            Sistema JD_owner    false    218            �           2606    458879 !   usuario usuario_RUT_USUARIO_key50 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key50" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key50";
       public            Sistema JD_owner    false    218            �           2606    458839 !   usuario usuario_RUT_USUARIO_key51 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key51" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key51";
       public            Sistema JD_owner    false    218            �           2606    458877 !   usuario usuario_RUT_USUARIO_key52 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key52" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key52";
       public            Sistema JD_owner    false    218            �           2606    458841 !   usuario usuario_RUT_USUARIO_key53 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key53" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key53";
       public            Sistema JD_owner    false    218            �           2606    458875 !   usuario usuario_RUT_USUARIO_key54 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key54" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key54";
       public            Sistema JD_owner    false    218            �           2606    458843 !   usuario usuario_RUT_USUARIO_key55 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key55" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key55";
       public            Sistema JD_owner    false    218                       2606    458873 !   usuario usuario_RUT_USUARIO_key56 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key56" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key56";
       public            Sistema JD_owner    false    218                       2606    458845 !   usuario usuario_RUT_USUARIO_key57 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key57" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key57";
       public            Sistema JD_owner    false    218                       2606    458871 !   usuario usuario_RUT_USUARIO_key58 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key58" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key58";
       public            Sistema JD_owner    false    218                       2606    458847 !   usuario usuario_RUT_USUARIO_key59 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key59" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key59";
       public            Sistema JD_owner    false    218            	           2606    458913     usuario usuario_RUT_USUARIO_key6 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key6" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key6";
       public            Sistema JD_owner    false    218                       2606    458869 !   usuario usuario_RUT_USUARIO_key60 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key60" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key60";
       public            Sistema JD_owner    false    218                       2606    458849 !   usuario usuario_RUT_USUARIO_key61 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key61" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key61";
       public            Sistema JD_owner    false    218                       2606    458851 !   usuario usuario_RUT_USUARIO_key62 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key62" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key62";
       public            Sistema JD_owner    false    218                       2606    458867 !   usuario usuario_RUT_USUARIO_key63 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key63" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key63";
       public            Sistema JD_owner    false    218                       2606    458853 !   usuario usuario_RUT_USUARIO_key64 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key64" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key64";
       public            Sistema JD_owner    false    218                       2606    458865 !   usuario usuario_RUT_USUARIO_key65 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key65" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key65";
       public            Sistema JD_owner    false    218                       2606    458855 !   usuario usuario_RUT_USUARIO_key66 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key66" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key66";
       public            Sistema JD_owner    false    218                       2606    458863 !   usuario usuario_RUT_USUARIO_key67 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key67" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key67";
       public            Sistema JD_owner    false    218                       2606    458857 !   usuario usuario_RUT_USUARIO_key68 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key68" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key68";
       public            Sistema JD_owner    false    218                       2606    458861 !   usuario usuario_RUT_USUARIO_key69 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key69" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key69";
       public            Sistema JD_owner    false    218                       2606    458927     usuario usuario_RUT_USUARIO_key7 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key7" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key7";
       public            Sistema JD_owner    false    218            !           2606    458859 !   usuario usuario_RUT_USUARIO_key70 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key70" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key70";
       public            Sistema JD_owner    false    218            #           2606    458817 !   usuario usuario_RUT_USUARIO_key71 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key71" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key71";
       public            Sistema JD_owner    false    218            %           2606    458961 !   usuario usuario_RUT_USUARIO_key72 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key72" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key72";
       public            Sistema JD_owner    false    218            '           2606    458815 !   usuario usuario_RUT_USUARIO_key73 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key73" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key73";
       public            Sistema JD_owner    false    218            )           2606    458963 !   usuario usuario_RUT_USUARIO_key74 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key74" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key74";
       public            Sistema JD_owner    false    218            +           2606    458813 !   usuario usuario_RUT_USUARIO_key75 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key75" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key75";
       public            Sistema JD_owner    false    218            -           2606    458965 !   usuario usuario_RUT_USUARIO_key76 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key76" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key76";
       public            Sistema JD_owner    false    218            /           2606    458811 !   usuario usuario_RUT_USUARIO_key77 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key77" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key77";
       public            Sistema JD_owner    false    218            1           2606    458967 !   usuario usuario_RUT_USUARIO_key78 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key78" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key78";
       public            Sistema JD_owner    false    218            3           2606    458809 !   usuario usuario_RUT_USUARIO_key79 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key79" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key79";
       public            Sistema JD_owner    false    218            5           2606    458929     usuario usuario_RUT_USUARIO_key8 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key8" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key8";
       public            Sistema JD_owner    false    218            7           2606    458969 !   usuario usuario_RUT_USUARIO_key80 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key80" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key80";
       public            Sistema JD_owner    false    218            9           2606    458807 !   usuario usuario_RUT_USUARIO_key81 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key81" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key81";
       public            Sistema JD_owner    false    218            ;           2606    458805 !   usuario usuario_RUT_USUARIO_key82 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key82" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key82";
       public            Sistema JD_owner    false    218            =           2606    458803 !   usuario usuario_RUT_USUARIO_key83 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key83" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key83";
       public            Sistema JD_owner    false    218            ?           2606    458801 !   usuario usuario_RUT_USUARIO_key84 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key84" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key84";
       public            Sistema JD_owner    false    218            A           2606    458799 !   usuario usuario_RUT_USUARIO_key85 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key85" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key85";
       public            Sistema JD_owner    false    218            C           2606    458971 !   usuario usuario_RUT_USUARIO_key86 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key86" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key86";
       public            Sistema JD_owner    false    218            E           2606    458797 !   usuario usuario_RUT_USUARIO_key87 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key87" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key87";
       public            Sistema JD_owner    false    218            G           2606    458795 !   usuario usuario_RUT_USUARIO_key88 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key88" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key88";
       public            Sistema JD_owner    false    218            I           2606    458793 !   usuario usuario_RUT_USUARIO_key89 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key89" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key89";
       public            Sistema JD_owner    false    218            K           2606    458931     usuario usuario_RUT_USUARIO_key9 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key9" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key9";
       public            Sistema JD_owner    false    218            M           2606    458791 !   usuario usuario_RUT_USUARIO_key90 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key90" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key90";
       public            Sistema JD_owner    false    218            O           2606    458789 !   usuario usuario_RUT_USUARIO_key91 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key91" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key91";
       public            Sistema JD_owner    false    218            Q           2606    458787 !   usuario usuario_RUT_USUARIO_key92 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key92" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key92";
       public            Sistema JD_owner    false    218            S           2606    458785 !   usuario usuario_RUT_USUARIO_key93 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key93" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key93";
       public            Sistema JD_owner    false    218            U           2606    458783 !   usuario usuario_RUT_USUARIO_key94 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key94" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key94";
       public            Sistema JD_owner    false    218            W           2606    458781 !   usuario usuario_RUT_USUARIO_key95 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key95" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key95";
       public            Sistema JD_owner    false    218            Y           2606    458779 !   usuario usuario_RUT_USUARIO_key96 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key96" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key96";
       public            Sistema JD_owner    false    218            [           2606    458973 !   usuario usuario_RUT_USUARIO_key97 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key97" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key97";
       public            Sistema JD_owner    false    218            ]           2606    458777 !   usuario usuario_RUT_USUARIO_key98 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key98" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key98";
       public            Sistema JD_owner    false    218            _           2606    458775 !   usuario usuario_RUT_USUARIO_key99 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key99" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key99";
       public            Sistema JD_owner    false    218            a           2606    57397    usuario usuario_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY ("ID_USUARIO");
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            Sistema JD_owner    false    218            _           2606    459411 7   cliente_metodo_pago cliente_metodo_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    223    220    3881            `           2606    459416 ;   cliente_metodo_pago cliente_metodo_pago_ID_METODO_PAGO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey" FOREIGN KEY ("ID_METODO_PAGO") REFERENCES public.metodos_pago("ID_METODO_PAGO") ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey";
       public          Sistema JD_owner    false    3883    223    222            b           2606    459421 5   contacto_comercial contacto_comercial_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT "contacto_comercial_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT "contacto_comercial_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    228    3881    220            a           2606    459426 7   informacion_de_pago informacion_de_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT "informacion_de_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT "informacion_de_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    220    3881    226            c           2606    459475    insumo insumo_ID_CATEGORIA_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_ID_CATEGORIA_fkey" FOREIGN KEY ("ID_CATEGORIA") REFERENCES public.categoria("ID_CATEGORIA") ON UPDATE CASCADE;
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_ID_CATEGORIA_fkey";
       public          Sistema JD_owner    false    232    230    3891            ^           2606    459200     usuario usuario_ROL_USUARIO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_ROL_USUARIO_fkey" FOREIGN KEY ("ROL_USUARIO") REFERENCES public.rol("ID_ROL") ON UPDATE CASCADE;
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_ROL_USUARIO_fkey";
       public          Sistema JD_owner    false    218    216    3235                       826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false                       826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false               7   x�3�J-(M-.�/�2��M�����9]�Rsr�L9�S��Ӹb���� ���      �   z  x�]QAn�0<�_�aRv�	J.��q:>�����L��"�SO}B>֥��A�f�3�a	f>/a���x|�I�/~PGh��y����B�R��E���%���;�)>��ip𕒻"=�{�Ép��C�έ�����D�F�L���y`I|
�ݚ�)D����n�.����HH=��'z��@�]�ƃ�JU�emO�[J�֝K줲�g�
u;N�{~\L���R�������X������������'0~꨻�i
tr@�i�S���m�-�|[���������y��iv�i̾1����_�Ӷ��ʬ� ]Y���`��v�@�Ty
��^cf4w�Q�,�,O�N9}]��� ��71��~K��)      �   j   x�5��	�0��*�!��mz��hQ�Ht/ۑuؘك��#��_�B�2 z��;����+�gb�%�&Wvg�M�����xL[y�oh����TD� ɫ�          �   x�3�4��*M�S8��(�J�1��41'�*1%�3(�W�
vH��$�%��rj��))XZ��)�����
��FF
��&&\F��F���^��>�0������G��ߗ�����؄�R�����8�8��+F��� �Z$�      �   l   x�3�4��*M�S8��(��3��+H2Rs�R����s9�M�,��ML��-�-8�,9]�\}|�at����������/����rZrprrr��qqq Ojo         �   x�m���0������K�{��p	iHMA��+1�a'�zA��_��>9t�1�楨?^��K
��Y=#6�2���<�t;����x���vL+�f��Eأ��c���y���9�-n�+��T*��<�p��nIx��J��?�u��9���D�      �   �   x�}�;�@Dk�>�z
JgwF�+̆;��	���y�yKjb��B=�!�z�T�+�J����5�{����UOVxM���s���E��	�C��!��t.��}������s� |Z0�D`RN      �   P   x�3�tL����,.)JL�/�2��JMKUHIUN-*�L���2��$��q�p:5�敤r�r�^���������� ��      �   �  x�u�I��0���W���!	a�S�*n��h�E�fXd����	�챦����R���/X��N�� (	�	���ڷ(;%)��ɹ�Q�:v�K��w����Xzɦ�'Z%Y���n�8���W�g��u]@D��B?�� ��a�a�j`�&	�*l�mH$
e*	�sh��dw���ȗu�o̓�r(�͢8�2VOLS�	,%S�#��Jp���, ] _A(ўd`RJ������'��S�<c�ÕquK��n�2����0�}k��~[��O5����5��P��J��Cy�P�`ȝ0J¨ �$,E�G�� ���/��4�Շ8oq�8��i��@t?vg:�y_��0��֍��R��z����! a���`B�g��F��	�g��+�&2���#�0����rh�R��*Q��rfk;\,Դ�ۦX�m�?��w���^�1���     