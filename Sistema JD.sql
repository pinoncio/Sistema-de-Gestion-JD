PGDMP      0    
             }        
   Sistema JD    16.6    16.4 ,   #           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            $           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            %           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            &           1262    16389 
   Sistema JD    DATABASE     t   CREATE DATABASE "Sistema JD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE "Sistema JD";
                Sistema JD_owner    false            '           0    0    DATABASE "Sistema JD"    ACL     6   GRANT ALL ON DATABASE "Sistema JD" TO neon_superuser;
                   Sistema JD_owner    false    3878            �            1259    90418    cliente    TABLE     �  CREATE TABLE public.cliente (
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
       public          Sistema JD_owner    false    220            (           0    0    cliente_ID_CLIENTE_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."cliente_ID_CLIENTE_seq" OWNED BY public.cliente."ID_CLIENTE";
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
       public          Sistema JD_owner    false    223            )           0    0    cliente_metodo_pago_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cliente_metodo_pago_id_seq OWNED BY public.cliente_metodo_pago.id;
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
       public          Sistema JD_owner    false    228            *           0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq" OWNED BY public.contacto_comercial."ID_CONTACTO_COMERCIAL";
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
       public          Sistema JD_owner    false    226            +           0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public."informacion_de_pago_ID_INFORMACION_seq" OWNED BY public.informacion_de_pago."ID_INFORMACION";
          public          Sistema JD_owner    false    225            �            1259    90496    metodos_pago    TABLE     �   CREATE TABLE public.metodos_pago (
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
       public          Sistema JD_owner    false    222            ,           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq" OWNED BY public.metodos_pago."ID_METODO_PAGO";
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
       public          Sistema JD_owner    false    216            -           0    0    rol_ID_ROL_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."rol_ID_ROL_seq" OWNED BY public.rol."ID_ROL";
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
       public          Sistema JD_owner    false    218            .           0    0    usuario_ID_USUARIO_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."usuario_ID_USUARIO_seq" OWNED BY public.usuario."ID_USUARIO";
          public          Sistema JD_owner    false    217            �           2604    90421    cliente ID_CLIENTE    DEFAULT     |   ALTER TABLE ONLY public.cliente ALTER COLUMN "ID_CLIENTE" SET DEFAULT nextval('public."cliente_ID_CLIENTE_seq"'::regclass);
 C   ALTER TABLE public.cliente ALTER COLUMN "ID_CLIENTE" DROP DEFAULT;
       public          Sistema JD_owner    false    219    220    220            �           2604    147656    cliente_metodo_pago id    DEFAULT     �   ALTER TABLE ONLY public.cliente_metodo_pago ALTER COLUMN id SET DEFAULT nextval('public.cliente_metodo_pago_id_seq'::regclass);
 E   ALTER TABLE public.cliente_metodo_pago ALTER COLUMN id DROP DEFAULT;
       public          Sistema JD_owner    false    224    223            �           2604    229403 (   contacto_comercial ID_CONTACTO_COMERCIAL    DEFAULT     �   ALTER TABLE ONLY public.contacto_comercial ALTER COLUMN "ID_CONTACTO_COMERCIAL" SET DEFAULT nextval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"'::regclass);
 Y   ALTER TABLE public.contacto_comercial ALTER COLUMN "ID_CONTACTO_COMERCIAL" DROP DEFAULT;
       public          Sistema JD_owner    false    228    227    228            �           2604    229389 "   informacion_de_pago ID_INFORMACION    DEFAULT     �   ALTER TABLE ONLY public.informacion_de_pago ALTER COLUMN "ID_INFORMACION" SET DEFAULT nextval('public."informacion_de_pago_ID_INFORMACION_seq"'::regclass);
 S   ALTER TABLE public.informacion_de_pago ALTER COLUMN "ID_INFORMACION" DROP DEFAULT;
       public          Sistema JD_owner    false    226    225    226            �           2604    90499    metodos_pago ID_METODO_PAGO    DEFAULT     �   ALTER TABLE ONLY public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" SET DEFAULT nextval('public."metodos_pago_ID_METODO_PAGO_seq"'::regclass);
 L   ALTER TABLE public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" DROP DEFAULT;
       public          Sistema JD_owner    false    222    221    222            �           2604    57383 
   rol ID_ROL    DEFAULT     l   ALTER TABLE ONLY public.rol ALTER COLUMN "ID_ROL" SET DEFAULT nextval('public."rol_ID_ROL_seq"'::regclass);
 ;   ALTER TABLE public.rol ALTER COLUMN "ID_ROL" DROP DEFAULT;
       public          Sistema JD_owner    false    215    216    216            �           2604    57392    usuario ID_USUARIO    DEFAULT     |   ALTER TABLE ONLY public.usuario ALTER COLUMN "ID_USUARIO" SET DEFAULT nextval('public."usuario_ID_USUARIO_seq"'::regclass);
 C   ALTER TABLE public.usuario ALTER COLUMN "ID_USUARIO" DROP DEFAULT;
       public          Sistema JD_owner    false    217    218    218                      0    90418    cliente 
   TABLE DATA           �   COPY public.cliente ("ID_CLIENTE", "CODIGO_CLIENTE", "NOMBRE_RAZON_SOCIAL", "NOMBRE_FANTASIA", "RUT", "GIRO", "DIRECCION", "CIUDAD", "COMUNA", "CLIENTE_VIGENTE") FROM stdin;
    public          Sistema JD_owner    false    220   �                0    90502    cliente_metodo_pago 
   TABLE DATA           _   COPY public.cliente_metodo_pago ("ID_CLIENTE", "ID_METODO_PAGO", "REFERENCIA", id) FROM stdin;
    public          Sistema JD_owner    false    223   `�                 0    229400    contacto_comercial 
   TABLE DATA           �   COPY public.contacto_comercial ("ID_CONTACTO_COMERCIAL", "ID_CLIENTE", "CONTACTO_COMERCIAL", "CORREO_ELECTRONICO_COMERCIAL", "TELEFONO_FIJO", "TELEFONO_CELULAR") FROM stdin;
    public          Sistema JD_owner    false    228   �                0    229386    informacion_de_pago 
   TABLE DATA           �   COPY public.informacion_de_pago ("ID_INFORMACION", "ID_CLIENTE", "NOMBRE_RESPONSABLE", "CORREO_ELECTRONICO", "TELEFONO_RESPONSABLE") FROM stdin;
    public          Sistema JD_owner    false    226   K�                0    90496    metodos_pago 
   TABLE DATA           X   COPY public.metodos_pago ("ID_METODO_PAGO", "NOMBRE_METODO", "DESCRIPCION") FROM stdin;
    public          Sistema JD_owner    false    222   ��                0    57380    rol 
   TABLE DATA           5   COPY public.rol ("ID_ROL", "NOMBRE_ROL") FROM stdin;
    public          Sistema JD_owner    false    216   0�                0    57389    usuario 
   TABLE DATA           �   COPY public.usuario ("ID_USUARIO", "NOMBRE_USUARIO", "APELLIDO_USUARIO", "RUT_USUARIO", "EMAIL_USUARIO", "CONTRASENIA_USUARIO", "FECHA_NACIMIENTO_USUARIO", "ROL_USUARIO", "ESTADO_USUARIO") FROM stdin;
    public          Sistema JD_owner    false    218   ��      /           0    0    cliente_ID_CLIENTE_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."cliente_ID_CLIENTE_seq"', 25, true);
          public          Sistema JD_owner    false    219            0           0    0    cliente_metodo_pago_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.cliente_metodo_pago_id_seq', 22, true);
          public          Sistema JD_owner    false    224            1           0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"', 17, true);
          public          Sistema JD_owner    false    227            2           0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."informacion_de_pago_ID_INFORMACION_seq"', 14, true);
          public          Sistema JD_owner    false    225            3           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."metodos_pago_ID_METODO_PAGO_seq"', 6, true);
          public          Sistema JD_owner    false    221            4           0    0    rol_ID_ROL_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."rol_ID_ROL_seq"', 15, true);
          public          Sistema JD_owner    false    215            5           0    0    usuario_ID_USUARIO_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."usuario_ID_USUARIO_seq"', 23, true);
          public          Sistema JD_owner    false    217            �           2606    336838    cliente cliente_RUT_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key" UNIQUE ("RUT");
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key";
       public            Sistema JD_owner    false    220            �           2606    336840    cliente cliente_RUT_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key1" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key1";
       public            Sistema JD_owner    false    220            �           2606    336740    cliente cliente_RUT_key10 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key10" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key10";
       public            Sistema JD_owner    false    220            �           2606    336742    cliente cliente_RUT_key11 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key11" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key11";
       public            Sistema JD_owner    false    220            �           2606    336798    cliente cliente_RUT_key12 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key12" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key12";
       public            Sistema JD_owner    false    220            �           2606    336744    cliente cliente_RUT_key13 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key13" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key13";
       public            Sistema JD_owner    false    220            �           2606    336748    cliente cliente_RUT_key14 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key14" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key14";
       public            Sistema JD_owner    false    220            �           2606    336796    cliente cliente_RUT_key15 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key15" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key15";
       public            Sistema JD_owner    false    220            �           2606    336750    cliente cliente_RUT_key16 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key16" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key16";
       public            Sistema JD_owner    false    220            �           2606    336784    cliente cliente_RUT_key17 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key17" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key17";
       public            Sistema JD_owner    false    220            �           2606    336782    cliente cliente_RUT_key18 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key18" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key18";
       public            Sistema JD_owner    false    220            �           2606    336780    cliente cliente_RUT_key19 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key19" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key19";
       public            Sistema JD_owner    false    220            �           2606    336842    cliente cliente_RUT_key2 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key2" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key2";
       public            Sistema JD_owner    false    220                        2606    336752    cliente cliente_RUT_key20 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key20" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key20";
       public            Sistema JD_owner    false    220                       2606    336778    cliente cliente_RUT_key21 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key21" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key21";
       public            Sistema JD_owner    false    220                       2606    336756    cliente cliente_RUT_key22 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key22" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key22";
       public            Sistema JD_owner    false    220                       2606    336776    cliente cliente_RUT_key23 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key23" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key23";
       public            Sistema JD_owner    false    220                       2606    336758    cliente cliente_RUT_key24 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key24" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key24";
       public            Sistema JD_owner    false    220            
           2606    336774    cliente cliente_RUT_key25 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key25" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key25";
       public            Sistema JD_owner    false    220                       2606    336760    cliente cliente_RUT_key26 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key26" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key26";
       public            Sistema JD_owner    false    220                       2606    336772    cliente cliente_RUT_key27 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key27" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key27";
       public            Sistema JD_owner    false    220                       2606    336764    cliente cliente_RUT_key28 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key28" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key28";
       public            Sistema JD_owner    false    220                       2606    336770    cliente cliente_RUT_key29 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key29" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key29";
       public            Sistema JD_owner    false    220                       2606    336844    cliente cliente_RUT_key3 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key3" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key3";
       public            Sistema JD_owner    false    220                       2606    336766    cliente cliente_RUT_key30 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key30" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key30";
       public            Sistema JD_owner    false    220                       2606    336768    cliente cliente_RUT_key31 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key31" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key31";
       public            Sistema JD_owner    false    220                       2606    336836    cliente cliente_RUT_key32 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key32" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key32";
       public            Sistema JD_owner    false    220                       2606    336794    cliente cliente_RUT_key33 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key33" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key33";
       public            Sistema JD_owner    false    220                       2606    336834    cliente cliente_RUT_key34 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key34" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key34";
       public            Sistema JD_owner    false    220                        2606    336746    cliente cliente_RUT_key35 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key35" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key35";
       public            Sistema JD_owner    false    220            "           2606    336808    cliente cliente_RUT_key36 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key36" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key36";
       public            Sistema JD_owner    false    220            $           2606    336792    cliente cliente_RUT_key37 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key37" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key37";
       public            Sistema JD_owner    false    220            &           2606    336786    cliente cliente_RUT_key38 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key38" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key38";
       public            Sistema JD_owner    false    220            (           2606    336790    cliente cliente_RUT_key39 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key39" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key39";
       public            Sistema JD_owner    false    220            *           2606    336804    cliente cliente_RUT_key4 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key4" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key4";
       public            Sistema JD_owner    false    220            ,           2606    336788    cliente cliente_RUT_key40 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key40" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key40";
       public            Sistema JD_owner    false    220            .           2606    336754    cliente cliente_RUT_key41 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key41" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key41";
       public            Sistema JD_owner    false    220            0           2606    336826    cliente cliente_RUT_key42 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key42" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key42";
       public            Sistema JD_owner    false    220            2           2606    336762    cliente cliente_RUT_key43 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key43" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key43";
       public            Sistema JD_owner    false    220            4           2606    336846    cliente cliente_RUT_key44 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key44" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key44";
       public            Sistema JD_owner    false    220            6           2606    336824    cliente cliente_RUT_key45 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key45" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key45";
       public            Sistema JD_owner    false    220            8           2606    336848    cliente cliente_RUT_key46 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key46" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key46";
       public            Sistema JD_owner    false    220            :           2606    336822    cliente cliente_RUT_key47 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key47" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key47";
       public            Sistema JD_owner    false    220            <           2606    336850    cliente cliente_RUT_key48 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key48" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key48";
       public            Sistema JD_owner    false    220            >           2606    336820    cliente cliente_RUT_key49 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key49" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key49";
       public            Sistema JD_owner    false    220            @           2606    336828    cliente cliente_RUT_key5 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key5" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key5";
       public            Sistema JD_owner    false    220            B           2606    336852    cliente cliente_RUT_key50 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key50" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key50";
       public            Sistema JD_owner    false    220            D           2606    336854    cliente cliente_RUT_key51 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key51" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key51";
       public            Sistema JD_owner    false    220            F           2606    336818    cliente cliente_RUT_key52 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key52" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key52";
       public            Sistema JD_owner    false    220            H           2606    336856    cliente cliente_RUT_key53 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key53" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key53";
       public            Sistema JD_owner    false    220            J           2606    336816    cliente cliente_RUT_key54 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key54" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key54";
       public            Sistema JD_owner    false    220            L           2606    336814    cliente cliente_RUT_key55 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key55" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key55";
       public            Sistema JD_owner    false    220            N           2606    336812    cliente cliente_RUT_key56 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key56" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key56";
       public            Sistema JD_owner    false    220            P           2606    336858    cliente cliente_RUT_key57 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key57" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key57";
       public            Sistema JD_owner    false    220            R           2606    336810    cliente cliente_RUT_key58 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key58" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key58";
       public            Sistema JD_owner    false    220            T           2606    336860    cliente cliente_RUT_key59 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key59" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key59";
       public            Sistema JD_owner    false    220            V           2606    336830    cliente cliente_RUT_key6 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key6" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key6";
       public            Sistema JD_owner    false    220            X           2606    336738    cliente cliente_RUT_key60 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key60" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key60";
       public            Sistema JD_owner    false    220            Z           2606    336862    cliente cliente_RUT_key61 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key61" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key61";
       public            Sistema JD_owner    false    220            \           2606    336736    cliente cliente_RUT_key62 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key62" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key62";
       public            Sistema JD_owner    false    220            ^           2606    336864    cliente cliente_RUT_key63 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key63" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key63";
       public            Sistema JD_owner    false    220            `           2606    336734    cliente cliente_RUT_key64 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key64" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key64";
       public            Sistema JD_owner    false    220            b           2606    336866    cliente cliente_RUT_key65 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key65" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key65";
       public            Sistema JD_owner    false    220            d           2606    336732    cliente cliente_RUT_key66 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key66" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key66";
       public            Sistema JD_owner    false    220            f           2606    336868    cliente cliente_RUT_key67 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key67" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key67";
       public            Sistema JD_owner    false    220            h           2606    336730    cliente cliente_RUT_key68 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key68" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key68";
       public            Sistema JD_owner    false    220            j           2606    336728    cliente cliente_RUT_key69 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key69" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key69";
       public            Sistema JD_owner    false    220            l           2606    336802    cliente cliente_RUT_key7 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key7" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key7";
       public            Sistema JD_owner    false    220            n           2606    336806    cliente cliente_RUT_key70 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key70" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key70";
       public            Sistema JD_owner    false    220            p           2606    336870    cliente cliente_RUT_key71 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key71" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key71";
       public            Sistema JD_owner    false    220            r           2606    336832    cliente cliente_RUT_key8 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key8" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key8";
       public            Sistema JD_owner    false    220            t           2606    336800    cliente cliente_RUT_key9 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key9" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key9";
       public            Sistema JD_owner    false    220            z           2606    90506 ,   cliente_metodo_pago cliente_metodo_pago_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_pkey PRIMARY KEY ("ID_CLIENTE", "ID_METODO_PAGO");
 V   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_pkey;
       public            Sistema JD_owner    false    223    223            v           2606    90426    cliente cliente_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY ("ID_CLIENTE");
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            Sistema JD_owner    false    220            ~           2606    229407 *   contacto_comercial contacto_comercial_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT contacto_comercial_pkey PRIMARY KEY ("ID_CONTACTO_COMERCIAL");
 T   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT contacto_comercial_pkey;
       public            Sistema JD_owner    false    228            |           2606    229393 ,   informacion_de_pago informacion_de_pago_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT informacion_de_pago_pkey PRIMARY KEY ("ID_INFORMACION");
 V   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT informacion_de_pago_pkey;
       public            Sistema JD_owner    false    226            x           2606    90501    metodos_pago metodos_pago_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY ("ID_METODO_PAGO");
 H   ALTER TABLE ONLY public.metodos_pago DROP CONSTRAINT metodos_pago_pkey;
       public            Sistema JD_owner    false    222            �           2606    336724    rol rol_NOMBRE_ROL_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "rol_NOMBRE_ROL_key" UNIQUE ("NOMBRE_ROL");
 B   ALTER TABLE ONLY public.rol DROP CONSTRAINT "rol_NOMBRE_ROL_key";
       public            Sistema JD_owner    false    216            �           2606    57385    rol rol_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY ("ID_ROL");
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            Sistema JD_owner    false    216            �           2606    336553 !   usuario usuario_EMAIL_USUARIO_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key" UNIQUE ("EMAIL_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    336571 "   usuario usuario_EMAIL_USUARIO_key1 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key1" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    336711 #   usuario usuario_EMAIL_USUARIO_key10 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key10" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    336587 #   usuario usuario_EMAIL_USUARIO_key11 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key11" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    336589 #   usuario usuario_EMAIL_USUARIO_key12 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key12" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    336591 #   usuario usuario_EMAIL_USUARIO_key13 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key13" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    336593 #   usuario usuario_EMAIL_USUARIO_key14 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key14" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    336709 #   usuario usuario_EMAIL_USUARIO_key15 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key15" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    336595 #   usuario usuario_EMAIL_USUARIO_key16 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key16" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    336597 #   usuario usuario_EMAIL_USUARIO_key17 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key17" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    336707 #   usuario usuario_EMAIL_USUARIO_key18 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key18" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    336705 #   usuario usuario_EMAIL_USUARIO_key19 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key19" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    336573 "   usuario usuario_EMAIL_USUARIO_key2 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key2" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    336599 #   usuario usuario_EMAIL_USUARIO_key20 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key20" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key20";
       public            Sistema JD_owner    false    218            �           2606    336703 #   usuario usuario_EMAIL_USUARIO_key21 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key21" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key21";
       public            Sistema JD_owner    false    218            �           2606    336601 #   usuario usuario_EMAIL_USUARIO_key22 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key22" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key22";
       public            Sistema JD_owner    false    218            �           2606    336701 #   usuario usuario_EMAIL_USUARIO_key23 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key23" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key23";
       public            Sistema JD_owner    false    218            �           2606    336603 #   usuario usuario_EMAIL_USUARIO_key24 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key24" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key24";
       public            Sistema JD_owner    false    218            �           2606    336605 #   usuario usuario_EMAIL_USUARIO_key25 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key25" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key25";
       public            Sistema JD_owner    false    218            �           2606    336697 #   usuario usuario_EMAIL_USUARIO_key26 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key26" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key26";
       public            Sistema JD_owner    false    218            �           2606    336607 #   usuario usuario_EMAIL_USUARIO_key27 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key27" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key27";
       public            Sistema JD_owner    false    218            �           2606    336695 #   usuario usuario_EMAIL_USUARIO_key28 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key28" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key28";
       public            Sistema JD_owner    false    218            �           2606    336693 #   usuario usuario_EMAIL_USUARIO_key29 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key29" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key29";
       public            Sistema JD_owner    false    218            �           2606    336575 "   usuario usuario_EMAIL_USUARIO_key3 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key3" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key3";
       public            Sistema JD_owner    false    218            �           2606    336609 #   usuario usuario_EMAIL_USUARIO_key30 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key30" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key30";
       public            Sistema JD_owner    false    218            �           2606    336691 #   usuario usuario_EMAIL_USUARIO_key31 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key31" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key31";
       public            Sistema JD_owner    false    218            �           2606    336689 #   usuario usuario_EMAIL_USUARIO_key32 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key32" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key32";
       public            Sistema JD_owner    false    218            �           2606    336631 #   usuario usuario_EMAIL_USUARIO_key33 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key33" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key33";
       public            Sistema JD_owner    false    218            �           2606    336687 #   usuario usuario_EMAIL_USUARIO_key34 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key34" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key34";
       public            Sistema JD_owner    false    218            �           2606    336633 #   usuario usuario_EMAIL_USUARIO_key35 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key35" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key35";
       public            Sistema JD_owner    false    218            �           2606    336649 #   usuario usuario_EMAIL_USUARIO_key36 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key36" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key36";
       public            Sistema JD_owner    false    218            �           2606    336635 #   usuario usuario_EMAIL_USUARIO_key37 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key37" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key37";
       public            Sistema JD_owner    false    218            �           2606    336647 #   usuario usuario_EMAIL_USUARIO_key38 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key38" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key38";
       public            Sistema JD_owner    false    218            �           2606    336637 #   usuario usuario_EMAIL_USUARIO_key39 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key39" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key39";
       public            Sistema JD_owner    false    218            �           2606    336577 "   usuario usuario_EMAIL_USUARIO_key4 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key4" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key4";
       public            Sistema JD_owner    false    218            �           2606    336645 #   usuario usuario_EMAIL_USUARIO_key40 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key40" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key40";
       public            Sistema JD_owner    false    218            �           2606    336639 #   usuario usuario_EMAIL_USUARIO_key41 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key41" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key41";
       public            Sistema JD_owner    false    218            �           2606    336643 #   usuario usuario_EMAIL_USUARIO_key42 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key42" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key42";
       public            Sistema JD_owner    false    218            �           2606    336641 #   usuario usuario_EMAIL_USUARIO_key43 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key43" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key43";
       public            Sistema JD_owner    false    218            �           2606    336617 #   usuario usuario_EMAIL_USUARIO_key44 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key44" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key44";
       public            Sistema JD_owner    false    218            �           2606    336611 #   usuario usuario_EMAIL_USUARIO_key45 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key45" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key45";
       public            Sistema JD_owner    false    218            �           2606    336615 #   usuario usuario_EMAIL_USUARIO_key46 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key46" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key46";
       public            Sistema JD_owner    false    218            �           2606    336613 #   usuario usuario_EMAIL_USUARIO_key47 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key47" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key47";
       public            Sistema JD_owner    false    218            �           2606    336699 #   usuario usuario_EMAIL_USUARIO_key48 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key48" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key48";
       public            Sistema JD_owner    false    218            �           2606    336651 #   usuario usuario_EMAIL_USUARIO_key49 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key49" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key49";
       public            Sistema JD_owner    false    218            �           2606    336579 "   usuario usuario_EMAIL_USUARIO_key5 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key5" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key5";
       public            Sistema JD_owner    false    218            �           2606    336685 #   usuario usuario_EMAIL_USUARIO_key50 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key50" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key50";
       public            Sistema JD_owner    false    218            �           2606    336653 #   usuario usuario_EMAIL_USUARIO_key51 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key51" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key51";
       public            Sistema JD_owner    false    218            �           2606    336683 #   usuario usuario_EMAIL_USUARIO_key52 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key52" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key52";
       public            Sistema JD_owner    false    218            �           2606    336655 #   usuario usuario_EMAIL_USUARIO_key53 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key53" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key53";
       public            Sistema JD_owner    false    218            �           2606    336681 #   usuario usuario_EMAIL_USUARIO_key54 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key54" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key54";
       public            Sistema JD_owner    false    218            �           2606    336657 #   usuario usuario_EMAIL_USUARIO_key55 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key55" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key55";
       public            Sistema JD_owner    false    218                        2606    336679 #   usuario usuario_EMAIL_USUARIO_key56 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key56" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key56";
       public            Sistema JD_owner    false    218                       2606    336659 #   usuario usuario_EMAIL_USUARIO_key57 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key57" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key57";
       public            Sistema JD_owner    false    218                       2606    336677 #   usuario usuario_EMAIL_USUARIO_key58 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key58" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key58";
       public            Sistema JD_owner    false    218                       2606    336661 #   usuario usuario_EMAIL_USUARIO_key59 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key59" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key59";
       public            Sistema JD_owner    false    218                       2606    336713 "   usuario usuario_EMAIL_USUARIO_key6 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key6" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key6";
       public            Sistema JD_owner    false    218            
           2606    336675 #   usuario usuario_EMAIL_USUARIO_key60 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key60" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key60";
       public            Sistema JD_owner    false    218                       2606    336663 #   usuario usuario_EMAIL_USUARIO_key61 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key61" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key61";
       public            Sistema JD_owner    false    218                       2606    336665 #   usuario usuario_EMAIL_USUARIO_key62 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key62" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key62";
       public            Sistema JD_owner    false    218                       2606    336673 #   usuario usuario_EMAIL_USUARIO_key63 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key63" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key63";
       public            Sistema JD_owner    false    218                       2606    336667 #   usuario usuario_EMAIL_USUARIO_key64 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key64" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key64";
       public            Sistema JD_owner    false    218                       2606    336671 #   usuario usuario_EMAIL_USUARIO_key65 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key65" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key65";
       public            Sistema JD_owner    false    218                       2606    336669 #   usuario usuario_EMAIL_USUARIO_key66 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key66" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key66";
       public            Sistema JD_owner    false    218                       2606    336629 #   usuario usuario_EMAIL_USUARIO_key67 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key67" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key67";
       public            Sistema JD_owner    false    218                       2606    336619 #   usuario usuario_EMAIL_USUARIO_key68 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key68" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key68";
       public            Sistema JD_owner    false    218                       2606    336627 #   usuario usuario_EMAIL_USUARIO_key69 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key69" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key69";
       public            Sistema JD_owner    false    218                       2606    336581 "   usuario usuario_EMAIL_USUARIO_key7 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key7" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key7";
       public            Sistema JD_owner    false    218                        2606    336621 #   usuario usuario_EMAIL_USUARIO_key70 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key70" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key70";
       public            Sistema JD_owner    false    218            "           2606    336625 #   usuario usuario_EMAIL_USUARIO_key71 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key71" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key71";
       public            Sistema JD_owner    false    218            $           2606    336555 #   usuario usuario_EMAIL_USUARIO_key72 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key72" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key72";
       public            Sistema JD_owner    false    218            &           2606    336623 #   usuario usuario_EMAIL_USUARIO_key73 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key73" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key73";
       public            Sistema JD_owner    false    218            (           2606    336557 #   usuario usuario_EMAIL_USUARIO_key74 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key74" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key74";
       public            Sistema JD_owner    false    218            *           2606    336569 #   usuario usuario_EMAIL_USUARIO_key75 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key75" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key75";
       public            Sistema JD_owner    false    218            ,           2606    336559 #   usuario usuario_EMAIL_USUARIO_key76 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key76" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key76";
       public            Sistema JD_owner    false    218            .           2606    336567 #   usuario usuario_EMAIL_USUARIO_key77 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key77" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key77";
       public            Sistema JD_owner    false    218            0           2606    336561 #   usuario usuario_EMAIL_USUARIO_key78 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key78" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key78";
       public            Sistema JD_owner    false    218            2           2606    336565 #   usuario usuario_EMAIL_USUARIO_key79 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key79" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key79";
       public            Sistema JD_owner    false    218            4           2606    336583 "   usuario usuario_EMAIL_USUARIO_key8 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key8" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key8";
       public            Sistema JD_owner    false    218            6           2606    336563 #   usuario usuario_EMAIL_USUARIO_key80 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key80" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key80";
       public            Sistema JD_owner    false    218            8           2606    336551 #   usuario usuario_EMAIL_USUARIO_key81 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key81" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key81";
       public            Sistema JD_owner    false    218            :           2606    336715 #   usuario usuario_EMAIL_USUARIO_key82 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key82" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key82";
       public            Sistema JD_owner    false    218            <           2606    336585 "   usuario usuario_EMAIL_USUARIO_key9 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key9" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key9";
       public            Sistema JD_owner    false    218            >           2606    336493    usuario usuario_RUT_USUARIO_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key" UNIQUE ("RUT_USUARIO");
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key";
       public            Sistema JD_owner    false    218            @           2606    336495     usuario usuario_RUT_USUARIO_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key1" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key1";
       public            Sistema JD_owner    false    218            B           2606    336489 !   usuario usuario_RUT_USUARIO_key10 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key10" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key10";
       public            Sistema JD_owner    false    218            D           2606    336511 !   usuario usuario_RUT_USUARIO_key11 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key11" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key11";
       public            Sistema JD_owner    false    218            F           2606    336487 !   usuario usuario_RUT_USUARIO_key12 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key12" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key12";
       public            Sistema JD_owner    false    218            H           2606    336513 !   usuario usuario_RUT_USUARIO_key13 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key13" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key13";
       public            Sistema JD_owner    false    218            J           2606    336521 !   usuario usuario_RUT_USUARIO_key14 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key14" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key14";
       public            Sistema JD_owner    false    218            L           2606    336485 !   usuario usuario_RUT_USUARIO_key15 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key15" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key15";
       public            Sistema JD_owner    false    218            N           2606    336523 !   usuario usuario_RUT_USUARIO_key16 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key16" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key16";
       public            Sistema JD_owner    false    218            P           2606    336525 !   usuario usuario_RUT_USUARIO_key17 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key17" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key17";
       public            Sistema JD_owner    false    218            R           2606    336535 !   usuario usuario_RUT_USUARIO_key18 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key18" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key18";
       public            Sistema JD_owner    false    218            T           2606    336533 !   usuario usuario_RUT_USUARIO_key19 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key19" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key19";
       public            Sistema JD_owner    false    218            V           2606    336497     usuario usuario_RUT_USUARIO_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key2" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key2";
       public            Sistema JD_owner    false    218            X           2606    336527 !   usuario usuario_RUT_USUARIO_key20 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key20" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key20";
       public            Sistema JD_owner    false    218            Z           2606    336529 !   usuario usuario_RUT_USUARIO_key21 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key21" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key21";
       public            Sistema JD_owner    false    218            \           2606    336531 !   usuario usuario_RUT_USUARIO_key22 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key22" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key22";
       public            Sistema JD_owner    false    218            ^           2606    336519 !   usuario usuario_RUT_USUARIO_key23 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key23" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key23";
       public            Sistema JD_owner    false    218            `           2606    336515 !   usuario usuario_RUT_USUARIO_key24 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key24" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key24";
       public            Sistema JD_owner    false    218            b           2606    336517 !   usuario usuario_RUT_USUARIO_key25 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key25" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key25";
       public            Sistema JD_owner    false    218            d           2606    336483 !   usuario usuario_RUT_USUARIO_key26 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key26" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key26";
       public            Sistema JD_owner    false    218            f           2606    336537 !   usuario usuario_RUT_USUARIO_key27 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key27" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key27";
       public            Sistema JD_owner    false    218            h           2606    336481 !   usuario usuario_RUT_USUARIO_key28 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key28" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key28";
       public            Sistema JD_owner    false    218            j           2606    336479 !   usuario usuario_RUT_USUARIO_key29 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key29" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key29";
       public            Sistema JD_owner    false    218            l           2606    336499     usuario usuario_RUT_USUARIO_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key3" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key3";
       public            Sistema JD_owner    false    218            n           2606    336397 !   usuario usuario_RUT_USUARIO_key30 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key30" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key30";
       public            Sistema JD_owner    false    218            p           2606    336477 !   usuario usuario_RUT_USUARIO_key31 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key31" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key31";
       public            Sistema JD_owner    false    218            r           2606    336475 !   usuario usuario_RUT_USUARIO_key32 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key32" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key32";
       public            Sistema JD_owner    false    218            t           2606    336399 !   usuario usuario_RUT_USUARIO_key33 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key33" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key33";
       public            Sistema JD_owner    false    218            v           2606    336473 !   usuario usuario_RUT_USUARIO_key34 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key34" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key34";
       public            Sistema JD_owner    false    218            x           2606    336401 !   usuario usuario_RUT_USUARIO_key35 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key35" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key35";
       public            Sistema JD_owner    false    218            z           2606    336471 !   usuario usuario_RUT_USUARIO_key36 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key36" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key36";
       public            Sistema JD_owner    false    218            |           2606    336403 !   usuario usuario_RUT_USUARIO_key37 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key37" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key37";
       public            Sistema JD_owner    false    218            ~           2606    336469 !   usuario usuario_RUT_USUARIO_key38 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key38" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key38";
       public            Sistema JD_owner    false    218            �           2606    336405 !   usuario usuario_RUT_USUARIO_key39 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key39" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key39";
       public            Sistema JD_owner    false    218            �           2606    336501     usuario usuario_RUT_USUARIO_key4 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key4" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key4";
       public            Sistema JD_owner    false    218            �           2606    336467 !   usuario usuario_RUT_USUARIO_key40 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key40" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key40";
       public            Sistema JD_owner    false    218            �           2606    336407 !   usuario usuario_RUT_USUARIO_key41 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key41" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key41";
       public            Sistema JD_owner    false    218            �           2606    336465 !   usuario usuario_RUT_USUARIO_key42 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key42" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key42";
       public            Sistema JD_owner    false    218            �           2606    336409 !   usuario usuario_RUT_USUARIO_key43 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key43" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key43";
       public            Sistema JD_owner    false    218            �           2606    336463 !   usuario usuario_RUT_USUARIO_key44 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key44" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key44";
       public            Sistema JD_owner    false    218            �           2606    336411 !   usuario usuario_RUT_USUARIO_key45 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key45" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key45";
       public            Sistema JD_owner    false    218            �           2606    336461 !   usuario usuario_RUT_USUARIO_key46 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key46" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key46";
       public            Sistema JD_owner    false    218            �           2606    336413 !   usuario usuario_RUT_USUARIO_key47 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key47" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key47";
       public            Sistema JD_owner    false    218            �           2606    336459 !   usuario usuario_RUT_USUARIO_key48 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key48" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key48";
       public            Sistema JD_owner    false    218            �           2606    336415 !   usuario usuario_RUT_USUARIO_key49 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key49" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key49";
       public            Sistema JD_owner    false    218            �           2606    336503     usuario usuario_RUT_USUARIO_key5 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key5" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key5";
       public            Sistema JD_owner    false    218            �           2606    336457 !   usuario usuario_RUT_USUARIO_key50 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key50" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key50";
       public            Sistema JD_owner    false    218            �           2606    336417 !   usuario usuario_RUT_USUARIO_key51 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key51" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key51";
       public            Sistema JD_owner    false    218            �           2606    336455 !   usuario usuario_RUT_USUARIO_key52 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key52" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key52";
       public            Sistema JD_owner    false    218            �           2606    336419 !   usuario usuario_RUT_USUARIO_key53 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key53" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key53";
       public            Sistema JD_owner    false    218            �           2606    336453 !   usuario usuario_RUT_USUARIO_key54 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key54" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key54";
       public            Sistema JD_owner    false    218            �           2606    336421 !   usuario usuario_RUT_USUARIO_key55 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key55" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key55";
       public            Sistema JD_owner    false    218            �           2606    336451 !   usuario usuario_RUT_USUARIO_key56 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key56" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key56";
       public            Sistema JD_owner    false    218            �           2606    336423 !   usuario usuario_RUT_USUARIO_key57 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key57" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key57";
       public            Sistema JD_owner    false    218            �           2606    336449 !   usuario usuario_RUT_USUARIO_key58 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key58" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key58";
       public            Sistema JD_owner    false    218            �           2606    336425 !   usuario usuario_RUT_USUARIO_key59 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key59" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key59";
       public            Sistema JD_owner    false    218            �           2606    336491     usuario usuario_RUT_USUARIO_key6 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key6" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key6";
       public            Sistema JD_owner    false    218            �           2606    336447 !   usuario usuario_RUT_USUARIO_key60 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key60" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key60";
       public            Sistema JD_owner    false    218            �           2606    336427 !   usuario usuario_RUT_USUARIO_key61 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key61" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key61";
       public            Sistema JD_owner    false    218            �           2606    336429 !   usuario usuario_RUT_USUARIO_key62 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key62" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key62";
       public            Sistema JD_owner    false    218            �           2606    336445 !   usuario usuario_RUT_USUARIO_key63 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key63" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key63";
       public            Sistema JD_owner    false    218            �           2606    336431 !   usuario usuario_RUT_USUARIO_key64 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key64" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key64";
       public            Sistema JD_owner    false    218            �           2606    336443 !   usuario usuario_RUT_USUARIO_key65 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key65" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key65";
       public            Sistema JD_owner    false    218            �           2606    336433 !   usuario usuario_RUT_USUARIO_key66 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key66" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key66";
       public            Sistema JD_owner    false    218            �           2606    336441 !   usuario usuario_RUT_USUARIO_key67 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key67" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key67";
       public            Sistema JD_owner    false    218            �           2606    336435 !   usuario usuario_RUT_USUARIO_key68 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key68" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key68";
       public            Sistema JD_owner    false    218            �           2606    336439 !   usuario usuario_RUT_USUARIO_key69 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key69" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key69";
       public            Sistema JD_owner    false    218            �           2606    336505     usuario usuario_RUT_USUARIO_key7 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key7" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key7";
       public            Sistema JD_owner    false    218            �           2606    336437 !   usuario usuario_RUT_USUARIO_key70 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key70" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key70";
       public            Sistema JD_owner    false    218            �           2606    336395 !   usuario usuario_RUT_USUARIO_key71 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key71" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key71";
       public            Sistema JD_owner    false    218            �           2606    336539 !   usuario usuario_RUT_USUARIO_key72 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key72" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key72";
       public            Sistema JD_owner    false    218            �           2606    336393 !   usuario usuario_RUT_USUARIO_key73 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key73" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key73";
       public            Sistema JD_owner    false    218            �           2606    336541 !   usuario usuario_RUT_USUARIO_key74 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key74" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key74";
       public            Sistema JD_owner    false    218            �           2606    336391 !   usuario usuario_RUT_USUARIO_key75 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key75" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key75";
       public            Sistema JD_owner    false    218            �           2606    336543 !   usuario usuario_RUT_USUARIO_key76 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key76" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key76";
       public            Sistema JD_owner    false    218            �           2606    336389 !   usuario usuario_RUT_USUARIO_key77 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key77" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key77";
       public            Sistema JD_owner    false    218            �           2606    336545 !   usuario usuario_RUT_USUARIO_key78 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key78" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key78";
       public            Sistema JD_owner    false    218            �           2606    336387 !   usuario usuario_RUT_USUARIO_key79 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key79" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key79";
       public            Sistema JD_owner    false    218            �           2606    336507     usuario usuario_RUT_USUARIO_key8 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key8" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key8";
       public            Sistema JD_owner    false    218            �           2606    336547 !   usuario usuario_RUT_USUARIO_key80 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key80" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key80";
       public            Sistema JD_owner    false    218            �           2606    336385 !   usuario usuario_RUT_USUARIO_key81 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key81" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key81";
       public            Sistema JD_owner    false    218            �           2606    336383 !   usuario usuario_RUT_USUARIO_key82 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key82" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key82";
       public            Sistema JD_owner    false    218            �           2606    336509     usuario usuario_RUT_USUARIO_key9 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key9" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key9";
       public            Sistema JD_owner    false    218            �           2606    57397    usuario usuario_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY ("ID_USUARIO");
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            Sistema JD_owner    false    218            �           2606    336873 7   cliente_metodo_pago cliente_metodo_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    3702    220    223            �           2606    336878 ;   cliente_metodo_pago cliente_metodo_pago_ID_METODO_PAGO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey" FOREIGN KEY ("ID_METODO_PAGO") REFERENCES public.metodos_pago("ID_METODO_PAGO") ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey";
       public          Sistema JD_owner    false    222    223    3704            �           2606    336883 5   contacto_comercial contacto_comercial_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT "contacto_comercial_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT "contacto_comercial_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    220    3702    228            �           2606    336888 7   informacion_de_pago informacion_de_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT "informacion_de_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT "informacion_de_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    3702    220    226                       2606    336716     usuario usuario_ROL_USUARIO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_ROL_USUARIO_fkey" FOREIGN KEY ("ROL_USUARIO") REFERENCES public.rol("ID_ROL") ON UPDATE CASCADE;
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_ROL_USUARIO_fkey";
       public          Sistema JD_owner    false    218    216    3222                       826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false                       826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false               ;  x�]�MN�0��/�x�U;���JZ6E�t��)q[K�]�IQ�+�Ћ��.��7�{2(&�v�v�������{���Z��闀�B�Ldy�N�4�B�m�1���`����&-�9���K(��͹��O������� a՝G��?��A*.���|�.ao\OH-�}���>����ݸ�B�2�8���Æ"ruc"7�����r�A���j-��?�f/EK�u�1�ME��T�N/m0um���	
;4��C��� O�[l�9���@�֛jA�˫�
��ǝ�Q�@���"�uUj���9�"I�/Kl��         s   x�5�1
A���9�0�,�@�m�N�qd�m����b����(�}�qF����B��������y�w]��I�b��8w���2~إ�����װ��1��X )��g5�д#�/?n �          X   x�3�4��*M�S8��(�J�1��41'�*1%�3(�W�
vH��$�%��rj��))XZ��)�����
��FF
��&&\1z\\\ ��E         A   x�3�4��*M�S8��(��3��+H2Rs�R����s9�M�,��ML��-�b���� Wlc         �   x�}�;�@Dk�>�z
JgwF�+̆;��	���y�yKjb��B=�!�z�T�+�J����5�{����UOVxM���s���E��	�C��!��t.��}������s� |Z0�D`RN         P   x�3�tL����,.)JL�/�2��JMKUHIUN-*�L���2��$��q�p:5�敤r�r�^���������� ��         �  x�u�I��0���W���!	a�S�*n��h�E�fXd����	�챦����R���/X��N�� (	�	���ڷ(;%)��ɹ�Q�:v�K��w����Xzɦ�'Z%Y���n�8���W�g��u]@D��B?�� ��a�a�j`�&	�*l�mH$
e*	�sh��dw���ȗu�o̓�r(�͢8�2VOLS�	,%S�#��Jp���, ] _A(ўd`RJ������'��S�<c�ÕquK��n�2����0�}k��~[��O5����5��P��J��Cy�P�`ȝ0J¨ �$,E�G�� ���/��4�Շ8oq�8��i��@t?vg:�y_��0��֍��R��z����! a���`B�g��F��	�g��+�&2���#�0����rh�R��*Q��rfk;\,Դ�ۦX�m�?��w���^�1���     