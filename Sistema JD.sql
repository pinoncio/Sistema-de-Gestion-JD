PGDMP                      }        
   Sistema JD    16.6    16.4 �   s           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            t           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            u           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            v           1262    16389 
   Sistema JD    DATABASE     t   CREATE DATABASE "Sistema JD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE "Sistema JD";
                Sistema JD_owner    false            w           0    0    DATABASE "Sistema JD"    ACL     6   GRANT ALL ON DATABASE "Sistema JD" TO neon_superuser;
                   Sistema JD_owner    false    4214            �            1259    483380    OT    TABLE     \  CREATE TABLE public."OT" (
    "ID_OT" integer NOT NULL,
    "ID_CLIENTE" integer NOT NULL,
    "ID_INSUMO" integer NOT NULL,
    "TIPO_DOCUMENTO" character varying(50),
    "FECHA_SOLICITUD" date NOT NULL,
    "FECHA_ENTREGA" date NOT NULL,
    "TIPO_OT" character varying(50),
    "EQUIPO" character varying(100),
    "NUMERO_SERIE" character varying(100),
    "HORAS_TRABAJO" integer,
    "OBSERVACION_FINAL" text,
    "DESCRIPCION" text,
    "CANTIDAD" integer NOT NULL,
    "PRECIO_NETO" numeric(10,2) NOT NULL,
    "DESCUENTO" numeric(10,2),
    "RECARGO" numeric(10,2),
    "AF_EX" character varying(10),
    "SUB_TOTAL" numeric(10,2) NOT NULL,
    "COMENTARIO" text,
    "DESCUENTO_GLOBAL" numeric(10,2),
    "MONTO_NETO" numeric(10,2) NOT NULL,
    "MONTO_EXENTO" numeric(10,2),
    "IVA" numeric(10,2) NOT NULL,
    "TOTAL" numeric(10,2) NOT NULL
);
    DROP TABLE public."OT";
       public         heap    Sistema JD_owner    false            �            1259    483379    OT_ID_OT_seq    SEQUENCE     �   CREATE SEQUENCE public."OT_ID_OT_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."OT_ID_OT_seq";
       public          Sistema JD_owner    false    234            x           0    0    OT_ID_OT_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."OT_ID_OT_seq" OWNED BY public."OT"."ID_OT";
          public          Sistema JD_owner    false    233            �            1259    360470 	   categoria    TABLE     v   CREATE TABLE public.categoria (
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
       public          Sistema JD_owner    false    230            y           0    0    categorias_ID_CATEGORIA_seq    SEQUENCE OWNED BY     ^   ALTER SEQUENCE public."categorias_ID_CATEGORIA_seq" OWNED BY public.categoria."ID_CATEGORIA";
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
       public          Sistema JD_owner    false    220            z           0    0    cliente_ID_CLIENTE_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."cliente_ID_CLIENTE_seq" OWNED BY public.cliente."ID_CLIENTE";
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
       public          Sistema JD_owner    false    223            {           0    0    cliente_metodo_pago_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cliente_metodo_pago_id_seq OWNED BY public.cliente_metodo_pago.id;
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
       public          Sistema JD_owner    false    228            |           0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq" OWNED BY public.contacto_comercial."ID_CONTACTO_COMERCIAL";
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
       public          Sistema JD_owner    false    226            }           0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public."informacion_de_pago_ID_INFORMACION_seq" OWNED BY public.informacion_de_pago."ID_INFORMACION";
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
       public          Sistema JD_owner    false    232            ~           0    0    insumo_ID_INSUMO_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."insumo_ID_INSUMO_seq" OWNED BY public.insumo."ID_INSUMO";
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
       public          Sistema JD_owner    false    222                       0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq" OWNED BY public.metodos_pago."ID_METODO_PAGO";
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
       public          Sistema JD_owner    false    216            �           0    0    rol_ID_ROL_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."rol_ID_ROL_seq" OWNED BY public.rol."ID_ROL";
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
       public          Sistema JD_owner    false    218            �           0    0    usuario_ID_USUARIO_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public."usuario_ID_USUARIO_seq" OWNED BY public.usuario."ID_USUARIO";
          public          Sistema JD_owner    false    217            �           2604    483383    OT ID_OT    DEFAULT     j   ALTER TABLE ONLY public."OT" ALTER COLUMN "ID_OT" SET DEFAULT nextval('public."OT_ID_OT_seq"'::regclass);
 ;   ALTER TABLE public."OT" ALTER COLUMN "ID_OT" DROP DEFAULT;
       public          Sistema JD_owner    false    234    233    234            �           2604    360473    categoria ID_CATEGORIA    DEFAULT     �   ALTER TABLE ONLY public.categoria ALTER COLUMN "ID_CATEGORIA" SET DEFAULT nextval('public."categorias_ID_CATEGORIA_seq"'::regclass);
 G   ALTER TABLE public.categoria ALTER COLUMN "ID_CATEGORIA" DROP DEFAULT;
       public          Sistema JD_owner    false    229    230    230            �           2604    90421    cliente ID_CLIENTE    DEFAULT     |   ALTER TABLE ONLY public.cliente ALTER COLUMN "ID_CLIENTE" SET DEFAULT nextval('public."cliente_ID_CLIENTE_seq"'::regclass);
 C   ALTER TABLE public.cliente ALTER COLUMN "ID_CLIENTE" DROP DEFAULT;
       public          Sistema JD_owner    false    220    219    220            �           2604    147656    cliente_metodo_pago id    DEFAULT     �   ALTER TABLE ONLY public.cliente_metodo_pago ALTER COLUMN id SET DEFAULT nextval('public.cliente_metodo_pago_id_seq'::regclass);
 E   ALTER TABLE public.cliente_metodo_pago ALTER COLUMN id DROP DEFAULT;
       public          Sistema JD_owner    false    224    223            �           2604    229403 (   contacto_comercial ID_CONTACTO_COMERCIAL    DEFAULT     �   ALTER TABLE ONLY public.contacto_comercial ALTER COLUMN "ID_CONTACTO_COMERCIAL" SET DEFAULT nextval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"'::regclass);
 Y   ALTER TABLE public.contacto_comercial ALTER COLUMN "ID_CONTACTO_COMERCIAL" DROP DEFAULT;
       public          Sistema JD_owner    false    227    228    228            �           2604    229389 "   informacion_de_pago ID_INFORMACION    DEFAULT     �   ALTER TABLE ONLY public.informacion_de_pago ALTER COLUMN "ID_INFORMACION" SET DEFAULT nextval('public."informacion_de_pago_ID_INFORMACION_seq"'::regclass);
 S   ALTER TABLE public.informacion_de_pago ALTER COLUMN "ID_INFORMACION" DROP DEFAULT;
       public          Sistema JD_owner    false    225    226    226            �           2604    377401    insumo ID_INSUMO    DEFAULT     x   ALTER TABLE ONLY public.insumo ALTER COLUMN "ID_INSUMO" SET DEFAULT nextval('public."insumo_ID_INSUMO_seq"'::regclass);
 A   ALTER TABLE public.insumo ALTER COLUMN "ID_INSUMO" DROP DEFAULT;
       public          Sistema JD_owner    false    231    232    232            �           2604    90499    metodos_pago ID_METODO_PAGO    DEFAULT     �   ALTER TABLE ONLY public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" SET DEFAULT nextval('public."metodos_pago_ID_METODO_PAGO_seq"'::regclass);
 L   ALTER TABLE public.metodos_pago ALTER COLUMN "ID_METODO_PAGO" DROP DEFAULT;
       public          Sistema JD_owner    false    222    221    222            �           2604    57383 
   rol ID_ROL    DEFAULT     l   ALTER TABLE ONLY public.rol ALTER COLUMN "ID_ROL" SET DEFAULT nextval('public."rol_ID_ROL_seq"'::regclass);
 ;   ALTER TABLE public.rol ALTER COLUMN "ID_ROL" DROP DEFAULT;
       public          Sistema JD_owner    false    216    215    216            �           2604    57392    usuario ID_USUARIO    DEFAULT     |   ALTER TABLE ONLY public.usuario ALTER COLUMN "ID_USUARIO" SET DEFAULT nextval('public."usuario_ID_USUARIO_seq"'::regclass);
 C   ALTER TABLE public.usuario ALTER COLUMN "ID_USUARIO" DROP DEFAULT;
       public          Sistema JD_owner    false    218    217    218            p          0    483380    OT 
   TABLE DATA           k  COPY public."OT" ("ID_OT", "ID_CLIENTE", "ID_INSUMO", "TIPO_DOCUMENTO", "FECHA_SOLICITUD", "FECHA_ENTREGA", "TIPO_OT", "EQUIPO", "NUMERO_SERIE", "HORAS_TRABAJO", "OBSERVACION_FINAL", "DESCRIPCION", "CANTIDAD", "PRECIO_NETO", "DESCUENTO", "RECARGO", "AF_EX", "SUB_TOTAL", "COMENTARIO", "DESCUENTO_GLOBAL", "MONTO_NETO", "MONTO_EXENTO", "IVA", "TOTAL") FROM stdin;
    public          Sistema JD_owner    false    234   (�      l          0    360470 	   categoria 
   TABLE DATA           G   COPY public.categoria ("ID_CATEGORIA", "NOMBRE_CATEGORIA") FROM stdin;
    public          Sistema JD_owner    false    230   C�      b          0    90418    cliente 
   TABLE DATA           �   COPY public.cliente ("ID_CLIENTE", "CODIGO_CLIENTE", "NOMBRE_RAZON_SOCIAL", "NOMBRE_FANTASIA", "RUT", "GIRO", "DIRECCION", "CIUDAD", "COMUNA", "CLIENTE_VIGENTE") FROM stdin;
    public          Sistema JD_owner    false    220   ��      e          0    90502    cliente_metodo_pago 
   TABLE DATA           _   COPY public.cliente_metodo_pago ("ID_CLIENTE", "ID_METODO_PAGO", "REFERENCIA", id) FROM stdin;
    public          Sistema JD_owner    false    223   �      j          0    229400    contacto_comercial 
   TABLE DATA           �   COPY public.contacto_comercial ("ID_CONTACTO_COMERCIAL", "ID_CLIENTE", "CONTACTO_COMERCIAL", "CORREO_ELECTRONICO_COMERCIAL", "TELEFONO_FIJO", "TELEFONO_CELULAR") FROM stdin;
    public          Sistema JD_owner    false    228   ��      h          0    229386    informacion_de_pago 
   TABLE DATA           �   COPY public.informacion_de_pago ("ID_INFORMACION", "ID_CLIENTE", "NOMBRE_RESPONSABLE", "CORREO_ELECTRONICO", "TELEFONO_RESPONSABLE") FROM stdin;
    public          Sistema JD_owner    false    226   (�      n          0    377398    insumo 
   TABLE DATA           �   COPY public.insumo ("ID_INSUMO", "TIPO_INSUMO", "NOMBRE_INSUMO", "UBICACION", "CANTIDAD", "COSTO_UNIDAD", "SUB_TOTAL", "AJUSTE_ACTUAL", "STOCK_DISPONIBLE", "PRECIO_NETO", "ESTADO_INSUMO", "ID_CATEGORIA", "PRECIO_VENTA") FROM stdin;
    public          Sistema JD_owner    false    232   ��      d          0    90496    metodos_pago 
   TABLE DATA           X   COPY public.metodos_pago ("ID_METODO_PAGO", "NOMBRE_METODO", "DESCRIPCION") FROM stdin;
    public          Sistema JD_owner    false    222   َ      ^          0    57380    rol 
   TABLE DATA           5   COPY public.rol ("ID_ROL", "NOMBRE_ROL") FROM stdin;
    public          Sistema JD_owner    false    216   m�      `          0    57389    usuario 
   TABLE DATA           �   COPY public.usuario ("ID_USUARIO", "NOMBRE_USUARIO", "APELLIDO_USUARIO", "RUT_USUARIO", "EMAIL_USUARIO", "CONTRASENIA_USUARIO", "FECHA_NACIMIENTO_USUARIO", "ROL_USUARIO", "ESTADO_USUARIO") FROM stdin;
    public          Sistema JD_owner    false    218   ͏      �           0    0    OT_ID_OT_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."OT_ID_OT_seq"', 5, true);
          public          Sistema JD_owner    false    233            �           0    0    categorias_ID_CATEGORIA_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."categorias_ID_CATEGORIA_seq"', 5, true);
          public          Sistema JD_owner    false    229            �           0    0    cliente_ID_CLIENTE_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."cliente_ID_CLIENTE_seq"', 30, true);
          public          Sistema JD_owner    false    219            �           0    0    cliente_metodo_pago_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.cliente_metodo_pago_id_seq', 26, true);
          public          Sistema JD_owner    false    224            �           0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"', 22, true);
          public          Sistema JD_owner    false    227            �           0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."informacion_de_pago_ID_INFORMACION_seq"', 19, true);
          public          Sistema JD_owner    false    225            �           0    0    insumo_ID_INSUMO_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."insumo_ID_INSUMO_seq"', 23, true);
          public          Sistema JD_owner    false    231            �           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."metodos_pago_ID_METODO_PAGO_seq"', 6, true);
          public          Sistema JD_owner    false    221            �           0    0    rol_ID_ROL_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."rol_ID_ROL_seq"', 15, true);
          public          Sistema JD_owner    false    215            �           0    0    usuario_ID_USUARIO_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."usuario_ID_USUARIO_seq"', 23, true);
          public          Sistema JD_owner    false    217            �           2606    483387 
   OT OT_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public."OT"
    ADD CONSTRAINT "OT_pkey" PRIMARY KEY ("ID_OT");
 8   ALTER TABLE ONLY public."OT" DROP CONSTRAINT "OT_pkey";
       public            Sistema JD_owner    false    234            �           2606    360475    categoria categorias_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categorias_pkey PRIMARY KEY ("ID_CATEGORIA");
 C   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categorias_pkey;
       public            Sistema JD_owner    false    230            �           2606    516694    cliente cliente_RUT_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key" UNIQUE ("RUT");
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key";
       public            Sistema JD_owner    false    220            �           2606    516696    cliente cliente_RUT_key1 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key1" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key1";
       public            Sistema JD_owner    false    220            �           2606    516614    cliente cliente_RUT_key10 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key10" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key10";
       public            Sistema JD_owner    false    220            �           2606    516664    cliente cliente_RUT_key100 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key100" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key100";
       public            Sistema JD_owner    false    220            �           2606    516662    cliente cliente_RUT_key101 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key101" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key101";
       public            Sistema JD_owner    false    220            �           2606    516710    cliente cliente_RUT_key102 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key102" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key102";
       public            Sistema JD_owner    false    220            �           2606    516818    cliente cliente_RUT_key103 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key103" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key103";
       public            Sistema JD_owner    false    220            �           2606    516610    cliente cliente_RUT_key104 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key104" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key104";
       public            Sistema JD_owner    false    220            �           2606    516820    cliente cliente_RUT_key105 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key105" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key105";
       public            Sistema JD_owner    false    220            �           2606    516608    cliente cliente_RUT_key106 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key106" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key106";
       public            Sistema JD_owner    false    220            �           2606    516822    cliente cliente_RUT_key107 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key107" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key107";
       public            Sistema JD_owner    false    220            �           2606    516606    cliente cliente_RUT_key108 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key108" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key108";
       public            Sistema JD_owner    false    220            �           2606    516824    cliente cliente_RUT_key109 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key109" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key109";
       public            Sistema JD_owner    false    220            �           2606    516616    cliente cliente_RUT_key11 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key11" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key11";
       public            Sistema JD_owner    false    220            �           2606    516604    cliente cliente_RUT_key110 
   CONSTRAINT     X   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key110" UNIQUE ("RUT");
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key110";
       public            Sistema JD_owner    false    220            �           2606    516806    cliente cliente_RUT_key12 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key12" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key12";
       public            Sistema JD_owner    false    220            �           2606    516620    cliente cliente_RUT_key13 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key13" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key13";
       public            Sistema JD_owner    false    220            �           2606    516624    cliente cliente_RUT_key14 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key14" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key14";
       public            Sistema JD_owner    false    220            �           2606    516804    cliente cliente_RUT_key15 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key15" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key15";
       public            Sistema JD_owner    false    220            �           2606    516626    cliente cliente_RUT_key16 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key16" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key16";
       public            Sistema JD_owner    false    220            �           2606    516792    cliente cliente_RUT_key17 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key17" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key17";
       public            Sistema JD_owner    false    220            �           2606    516660    cliente cliente_RUT_key18 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key18" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key18";
       public            Sistema JD_owner    false    220            �           2606    516658    cliente cliente_RUT_key19 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key19" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key19";
       public            Sistema JD_owner    false    220            �           2606    516698    cliente cliente_RUT_key2 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key2" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key2";
       public            Sistema JD_owner    false    220            �           2606    516628    cliente cliente_RUT_key20 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key20" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key20";
       public            Sistema JD_owner    false    220            �           2606    516656    cliente cliente_RUT_key21 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key21" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key21";
       public            Sistema JD_owner    false    220            �           2606    516632    cliente cliente_RUT_key22 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key22" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key22";
       public            Sistema JD_owner    false    220            �           2606    516654    cliente cliente_RUT_key23 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key23" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key23";
       public            Sistema JD_owner    false    220            �           2606    516634    cliente cliente_RUT_key24 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key24" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key24";
       public            Sistema JD_owner    false    220            �           2606    516652    cliente cliente_RUT_key25 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key25" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key25";
       public            Sistema JD_owner    false    220            �           2606    516636    cliente cliente_RUT_key26 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key26" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key26";
       public            Sistema JD_owner    false    220            �           2606    516650    cliente cliente_RUT_key27 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key27" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key27";
       public            Sistema JD_owner    false    220            �           2606    516642    cliente cliente_RUT_key28 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key28" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key28";
       public            Sistema JD_owner    false    220            �           2606    516648    cliente cliente_RUT_key29 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key29" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key29";
       public            Sistema JD_owner    false    220            �           2606    516700    cliente cliente_RUT_key3 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key3" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key3";
       public            Sistema JD_owner    false    220            �           2606    516644    cliente cliente_RUT_key30 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key30" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key30";
       public            Sistema JD_owner    false    220            �           2606    516646    cliente cliente_RUT_key31 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key31" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key31";
       public            Sistema JD_owner    false    220            �           2606    516692    cliente cliente_RUT_key32 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key32" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key32";
       public            Sistema JD_owner    false    220            �           2606    516802    cliente cliente_RUT_key33 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key33" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key33";
       public            Sistema JD_owner    false    220            �           2606    516690    cliente cliente_RUT_key34 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key34" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key34";
       public            Sistema JD_owner    false    220            �           2606    516622    cliente cliente_RUT_key35 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key35" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key35";
       public            Sistema JD_owner    false    220            �           2606    516816    cliente cliente_RUT_key36 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key36" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key36";
       public            Sistema JD_owner    false    220            �           2606    516800    cliente cliente_RUT_key37 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key37" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key37";
       public            Sistema JD_owner    false    220            �           2606    516794    cliente cliente_RUT_key38 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key38" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key38";
       public            Sistema JD_owner    false    220            �           2606    516798    cliente cliente_RUT_key39 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key39" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key39";
       public            Sistema JD_owner    false    220            �           2606    516812    cliente cliente_RUT_key4 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key4" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key4";
       public            Sistema JD_owner    false    220            �           2606    516796    cliente cliente_RUT_key40 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key40" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key40";
       public            Sistema JD_owner    false    220            �           2606    516630    cliente cliente_RUT_key41 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key41" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key41";
       public            Sistema JD_owner    false    220            �           2606    516682    cliente cliente_RUT_key42 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key42" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key42";
       public            Sistema JD_owner    false    220            �           2606    516640    cliente cliente_RUT_key43 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key43" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key43";
       public            Sistema JD_owner    false    220            �           2606    516702    cliente cliente_RUT_key44 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key44" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key44";
       public            Sistema JD_owner    false    220            �           2606    516680    cliente cliente_RUT_key45 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key45" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key45";
       public            Sistema JD_owner    false    220                       2606    516704    cliente cliente_RUT_key46 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key46" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key46";
       public            Sistema JD_owner    false    220                       2606    516678    cliente cliente_RUT_key47 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key47" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key47";
       public            Sistema JD_owner    false    220                       2606    516706    cliente cliente_RUT_key48 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key48" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key48";
       public            Sistema JD_owner    false    220                       2606    516676    cliente cliente_RUT_key49 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key49" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key49";
       public            Sistema JD_owner    false    220            	           2606    516684    cliente cliente_RUT_key5 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key5" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key5";
       public            Sistema JD_owner    false    220                       2606    516708    cliente cliente_RUT_key50 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key50" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key50";
       public            Sistema JD_owner    false    220                       2606    516712    cliente cliente_RUT_key51 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key51" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key51";
       public            Sistema JD_owner    false    220                       2606    516674    cliente cliente_RUT_key52 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key52" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key52";
       public            Sistema JD_owner    false    220                       2606    516714    cliente cliente_RUT_key53 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key53" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key53";
       public            Sistema JD_owner    false    220                       2606    516672    cliente cliente_RUT_key54 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key54" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key54";
       public            Sistema JD_owner    false    220                       2606    516670    cliente cliente_RUT_key55 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key55" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key55";
       public            Sistema JD_owner    false    220                       2606    516668    cliente cliente_RUT_key56 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key56" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key56";
       public            Sistema JD_owner    false    220                       2606    516716    cliente cliente_RUT_key57 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key57" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key57";
       public            Sistema JD_owner    false    220                       2606    516666    cliente cliente_RUT_key58 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key58" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key58";
       public            Sistema JD_owner    false    220                       2606    516718    cliente cliente_RUT_key59 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key59" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key59";
       public            Sistema JD_owner    false    220                       2606    516686    cliente cliente_RUT_key6 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key6" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key6";
       public            Sistema JD_owner    false    220            !           2606    516612    cliente cliente_RUT_key60 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key60" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key60";
       public            Sistema JD_owner    false    220            #           2606    516720    cliente cliente_RUT_key61 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key61" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key61";
       public            Sistema JD_owner    false    220            %           2606    516790    cliente cliente_RUT_key62 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key62" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key62";
       public            Sistema JD_owner    false    220            '           2606    516722    cliente cliente_RUT_key63 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key63" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key63";
       public            Sistema JD_owner    false    220            )           2606    516788    cliente cliente_RUT_key64 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key64" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key64";
       public            Sistema JD_owner    false    220            +           2606    516724    cliente cliente_RUT_key65 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key65" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key65";
       public            Sistema JD_owner    false    220            -           2606    516786    cliente cliente_RUT_key66 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key66" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key66";
       public            Sistema JD_owner    false    220            /           2606    516726    cliente cliente_RUT_key67 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key67" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key67";
       public            Sistema JD_owner    false    220            1           2606    516784    cliente cliente_RUT_key68 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key68" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key68";
       public            Sistema JD_owner    false    220            3           2606    516782    cliente cliente_RUT_key69 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key69" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key69";
       public            Sistema JD_owner    false    220            5           2606    516810    cliente cliente_RUT_key7 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key7" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key7";
       public            Sistema JD_owner    false    220            7           2606    516814    cliente cliente_RUT_key70 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key70" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key70";
       public            Sistema JD_owner    false    220            9           2606    516728    cliente cliente_RUT_key71 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key71" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key71";
       public            Sistema JD_owner    false    220            ;           2606    516780    cliente cliente_RUT_key72 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key72" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key72";
       public            Sistema JD_owner    false    220            =           2606    516618    cliente cliente_RUT_key73 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key73" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key73";
       public            Sistema JD_owner    false    220            ?           2606    516778    cliente cliente_RUT_key74 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key74" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key74";
       public            Sistema JD_owner    false    220            A           2606    516730    cliente cliente_RUT_key75 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key75" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key75";
       public            Sistema JD_owner    false    220            C           2606    516776    cliente cliente_RUT_key76 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key76" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key76";
       public            Sistema JD_owner    false    220            E           2606    516732    cliente cliente_RUT_key77 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key77" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key77";
       public            Sistema JD_owner    false    220            G           2606    516774    cliente cliente_RUT_key78 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key78" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key78";
       public            Sistema JD_owner    false    220            I           2606    516742    cliente cliente_RUT_key79 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key79" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key79";
       public            Sistema JD_owner    false    220            K           2606    516688    cliente cliente_RUT_key8 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key8" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key8";
       public            Sistema JD_owner    false    220            M           2606    516772    cliente cliente_RUT_key80 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key80" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key80";
       public            Sistema JD_owner    false    220            O           2606    516744    cliente cliente_RUT_key81 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key81" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key81";
       public            Sistema JD_owner    false    220            Q           2606    516770    cliente cliente_RUT_key82 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key82" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key82";
       public            Sistema JD_owner    false    220            S           2606    516746    cliente cliente_RUT_key83 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key83" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key83";
       public            Sistema JD_owner    false    220            U           2606    516768    cliente cliente_RUT_key84 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key84" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key84";
       public            Sistema JD_owner    false    220            W           2606    516748    cliente cliente_RUT_key85 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key85" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key85";
       public            Sistema JD_owner    false    220            Y           2606    516766    cliente cliente_RUT_key86 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key86" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key86";
       public            Sistema JD_owner    false    220            [           2606    516750    cliente cliente_RUT_key87 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key87" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key87";
       public            Sistema JD_owner    false    220            ]           2606    516764    cliente cliente_RUT_key88 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key88" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key88";
       public            Sistema JD_owner    false    220            _           2606    516752    cliente cliente_RUT_key89 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key89" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key89";
       public            Sistema JD_owner    false    220            a           2606    516808    cliente cliente_RUT_key9 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key9" UNIQUE ("RUT");
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key9";
       public            Sistema JD_owner    false    220            c           2606    516762    cliente cliente_RUT_key90 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key90" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key90";
       public            Sistema JD_owner    false    220            e           2606    516754    cliente cliente_RUT_key91 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key91" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key91";
       public            Sistema JD_owner    false    220            g           2606    516760    cliente cliente_RUT_key92 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key92" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key92";
       public            Sistema JD_owner    false    220            i           2606    516756    cliente cliente_RUT_key93 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key93" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key93";
       public            Sistema JD_owner    false    220            k           2606    516758    cliente cliente_RUT_key94 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key94" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key94";
       public            Sistema JD_owner    false    220            m           2606    516638    cliente cliente_RUT_key95 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key95" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key95";
       public            Sistema JD_owner    false    220            o           2606    516740    cliente cliente_RUT_key96 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key96" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key96";
       public            Sistema JD_owner    false    220            q           2606    516734    cliente cliente_RUT_key97 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key97" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key97";
       public            Sistema JD_owner    false    220            s           2606    516738    cliente cliente_RUT_key98 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key98" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key98";
       public            Sistema JD_owner    false    220            u           2606    516736    cliente cliente_RUT_key99 
   CONSTRAINT     W   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key99" UNIQUE ("RUT");
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key99";
       public            Sistema JD_owner    false    220            {           2606    90506 ,   cliente_metodo_pago cliente_metodo_pago_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_pkey PRIMARY KEY ("ID_CLIENTE", "ID_METODO_PAGO");
 V   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_pkey;
       public            Sistema JD_owner    false    223    223            w           2606    90426    cliente cliente_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY ("ID_CLIENTE");
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            Sistema JD_owner    false    220                       2606    229407 *   contacto_comercial contacto_comercial_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT contacto_comercial_pkey PRIMARY KEY ("ID_CONTACTO_COMERCIAL");
 T   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT contacto_comercial_pkey;
       public            Sistema JD_owner    false    228            }           2606    229393 ,   informacion_de_pago informacion_de_pago_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT informacion_de_pago_pkey PRIMARY KEY ("ID_INFORMACION");
 V   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT informacion_de_pago_pkey;
       public            Sistema JD_owner    false    226            �           2606    516882    insumo insumo_NOMBRE_INSUMO_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key" UNIQUE ("NOMBRE_INSUMO");
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key";
       public            Sistema JD_owner    false    232            �           2606    516878     insumo insumo_NOMBRE_INSUMO_key1 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key1" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key1";
       public            Sistema JD_owner    false    232            �           2606    516892 !   insumo insumo_NOMBRE_INSUMO_key10 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key10" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key10";
       public            Sistema JD_owner    false    232            �           2606    516866 !   insumo insumo_NOMBRE_INSUMO_key11 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key11" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key11";
       public            Sistema JD_owner    false    232            �           2606    516894 !   insumo insumo_NOMBRE_INSUMO_key12 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key12" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key12";
       public            Sistema JD_owner    false    232            �           2606    516864 !   insumo insumo_NOMBRE_INSUMO_key13 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key13" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key13";
       public            Sistema JD_owner    false    232            �           2606    516862 !   insumo insumo_NOMBRE_INSUMO_key14 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key14" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key14";
       public            Sistema JD_owner    false    232            �           2606    516896 !   insumo insumo_NOMBRE_INSUMO_key15 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key15" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key15";
       public            Sistema JD_owner    false    232            �           2606    516898 !   insumo insumo_NOMBRE_INSUMO_key16 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key16" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key16";
       public            Sistema JD_owner    false    232            �           2606    516870 !   insumo insumo_NOMBRE_INSUMO_key17 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key17" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key17";
       public            Sistema JD_owner    false    232            �           2606    516900 !   insumo insumo_NOMBRE_INSUMO_key18 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key18" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key18";
       public            Sistema JD_owner    false    232            �           2606    516860 !   insumo insumo_NOMBRE_INSUMO_key19 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key19" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key19";
       public            Sistema JD_owner    false    232            �           2606    516884     insumo insumo_NOMBRE_INSUMO_key2 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key2" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key2";
       public            Sistema JD_owner    false    232            �           2606    516902 !   insumo insumo_NOMBRE_INSUMO_key20 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key20" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key20";
       public            Sistema JD_owner    false    232            �           2606    516880 !   insumo insumo_NOMBRE_INSUMO_key21 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key21" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key21";
       public            Sistema JD_owner    false    232            �           2606    516904 !   insumo insumo_NOMBRE_INSUMO_key22 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key22" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key22";
       public            Sistema JD_owner    false    232            �           2606    516858 !   insumo insumo_NOMBRE_INSUMO_key23 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key23" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key23";
       public            Sistema JD_owner    false    232            �           2606    516906 !   insumo insumo_NOMBRE_INSUMO_key24 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key24" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key24";
       public            Sistema JD_owner    false    232            �           2606    516856 !   insumo insumo_NOMBRE_INSUMO_key25 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key25" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key25";
       public            Sistema JD_owner    false    232            �           2606    516908 !   insumo insumo_NOMBRE_INSUMO_key26 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key26" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key26";
       public            Sistema JD_owner    false    232            �           2606    516854 !   insumo insumo_NOMBRE_INSUMO_key27 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key27" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key27";
       public            Sistema JD_owner    false    232            �           2606    516910 !   insumo insumo_NOMBRE_INSUMO_key28 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key28" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key28";
       public            Sistema JD_owner    false    232            �           2606    516852 !   insumo insumo_NOMBRE_INSUMO_key29 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key29" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key29";
       public            Sistema JD_owner    false    232            �           2606    516876     insumo insumo_NOMBRE_INSUMO_key3 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key3" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key3";
       public            Sistema JD_owner    false    232            �           2606    516850 !   insumo insumo_NOMBRE_INSUMO_key30 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key30" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key30";
       public            Sistema JD_owner    false    232            �           2606    516912 !   insumo insumo_NOMBRE_INSUMO_key31 
   CONSTRAINT     i   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key31" UNIQUE ("NOMBRE_INSUMO");
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key31";
       public            Sistema JD_owner    false    232            �           2606    516886     insumo insumo_NOMBRE_INSUMO_key4 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key4" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key4";
       public            Sistema JD_owner    false    232            �           2606    516874     insumo insumo_NOMBRE_INSUMO_key5 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key5" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key5";
       public            Sistema JD_owner    false    232            �           2606    516888     insumo insumo_NOMBRE_INSUMO_key6 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key6" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key6";
       public            Sistema JD_owner    false    232            �           2606    516872     insumo insumo_NOMBRE_INSUMO_key7 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key7" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key7";
       public            Sistema JD_owner    false    232            �           2606    516890     insumo insumo_NOMBRE_INSUMO_key8 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key8" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key8";
       public            Sistema JD_owner    false    232            �           2606    516868     insumo insumo_NOMBRE_INSUMO_key9 
   CONSTRAINT     h   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key9" UNIQUE ("NOMBRE_INSUMO");
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key9";
       public            Sistema JD_owner    false    232            �           2606    377406    insumo insumo_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_pkey PRIMARY KEY ("ID_INSUMO");
 <   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_pkey;
       public            Sistema JD_owner    false    232            y           2606    90501    metodos_pago metodos_pago_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY ("ID_METODO_PAGO");
 H   ALTER TABLE ONLY public.metodos_pago DROP CONSTRAINT metodos_pago_pkey;
       public            Sistema JD_owner    false    222            �           2606    516600    rol rol_NOMBRE_ROL_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "rol_NOMBRE_ROL_key" UNIQUE ("NOMBRE_ROL");
 B   ALTER TABLE ONLY public.rol DROP CONSTRAINT "rol_NOMBRE_ROL_key";
       public            Sistema JD_owner    false    216            �           2606    57385    rol rol_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY ("ID_ROL");
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            Sistema JD_owner    false    216            �           2606    516477 !   usuario usuario_EMAIL_USUARIO_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key" UNIQUE ("EMAIL_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    516495 "   usuario usuario_EMAIL_USUARIO_key1 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key1" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    516453 #   usuario usuario_EMAIL_USUARIO_key10 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key10" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    516369 $   usuario usuario_EMAIL_USUARIO_key100 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key100" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key100";
       public            Sistema JD_owner    false    218            �           2606    516573 $   usuario usuario_EMAIL_USUARIO_key101 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key101" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key101";
       public            Sistema JD_owner    false    218            �           2606    516367 $   usuario usuario_EMAIL_USUARIO_key102 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key102" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key102";
       public            Sistema JD_owner    false    218            �           2606    516575 $   usuario usuario_EMAIL_USUARIO_key103 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key103" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key103";
       public            Sistema JD_owner    false    218            �           2606    516365 $   usuario usuario_EMAIL_USUARIO_key104 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key104" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key104";
       public            Sistema JD_owner    false    218            �           2606    516577 $   usuario usuario_EMAIL_USUARIO_key105 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key105" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key105";
       public            Sistema JD_owner    false    218            �           2606    516363 $   usuario usuario_EMAIL_USUARIO_key106 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key106" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key106";
       public            Sistema JD_owner    false    218            �           2606    516579 $   usuario usuario_EMAIL_USUARIO_key107 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key107" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key107";
       public            Sistema JD_owner    false    218            �           2606    516361 $   usuario usuario_EMAIL_USUARIO_key108 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key108" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key108";
       public            Sistema JD_owner    false    218            �           2606    516583 $   usuario usuario_EMAIL_USUARIO_key109 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key109" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key109";
       public            Sistema JD_owner    false    218            �           2606    516511 #   usuario usuario_EMAIL_USUARIO_key11 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key11" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    516359 $   usuario usuario_EMAIL_USUARIO_key110 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key110" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key110";
       public            Sistema JD_owner    false    218            �           2606    516585 $   usuario usuario_EMAIL_USUARIO_key111 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key111" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key111";
       public            Sistema JD_owner    false    218            �           2606    516357 $   usuario usuario_EMAIL_USUARIO_key112 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key112" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key112";
       public            Sistema JD_owner    false    218            �           2606    516539 $   usuario usuario_EMAIL_USUARIO_key113 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key113" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key113";
       public            Sistema JD_owner    false    218            �           2606    516355 $   usuario usuario_EMAIL_USUARIO_key114 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key114" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key114";
       public            Sistema JD_owner    false    218            �           2606    516581 $   usuario usuario_EMAIL_USUARIO_key115 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key115" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key115";
       public            Sistema JD_owner    false    218            �           2606    516353 $   usuario usuario_EMAIL_USUARIO_key116 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key116" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key116";
       public            Sistema JD_owner    false    218            �           2606    516587 $   usuario usuario_EMAIL_USUARIO_key117 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key117" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key117";
       public            Sistema JD_owner    false    218            �           2606    516351 $   usuario usuario_EMAIL_USUARIO_key118 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key118" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key118";
       public            Sistema JD_owner    false    218            �           2606    516589 $   usuario usuario_EMAIL_USUARIO_key119 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key119" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key119";
       public            Sistema JD_owner    false    218            �           2606    516513 #   usuario usuario_EMAIL_USUARIO_key12 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key12" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    516349 $   usuario usuario_EMAIL_USUARIO_key120 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key120" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key120";
       public            Sistema JD_owner    false    218            �           2606    516591 $   usuario usuario_EMAIL_USUARIO_key121 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key121" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key121";
       public            Sistema JD_owner    false    218            �           2606    516347 $   usuario usuario_EMAIL_USUARIO_key122 
   CONSTRAINT     l   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key122" UNIQUE ("EMAIL_USUARIO");
 P   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key122";
       public            Sistema JD_owner    false    218            �           2606    516515 #   usuario usuario_EMAIL_USUARIO_key13 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key13" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    516517 #   usuario usuario_EMAIL_USUARIO_key14 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key14" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    516451 #   usuario usuario_EMAIL_USUARIO_key15 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key15" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    516519 #   usuario usuario_EMAIL_USUARIO_key16 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key16" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    516521 #   usuario usuario_EMAIL_USUARIO_key17 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key17" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    516449 #   usuario usuario_EMAIL_USUARIO_key18 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key18" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    516447 #   usuario usuario_EMAIL_USUARIO_key19 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key19" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    516497 "   usuario usuario_EMAIL_USUARIO_key2 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key2" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    516523 #   usuario usuario_EMAIL_USUARIO_key20 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key20" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key20";
       public            Sistema JD_owner    false    218            �           2606    516445 #   usuario usuario_EMAIL_USUARIO_key21 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key21" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key21";
       public            Sistema JD_owner    false    218            �           2606    516525 #   usuario usuario_EMAIL_USUARIO_key22 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key22" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key22";
       public            Sistema JD_owner    false    218            �           2606    516443 #   usuario usuario_EMAIL_USUARIO_key23 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key23" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key23";
       public            Sistema JD_owner    false    218            �           2606    516527 #   usuario usuario_EMAIL_USUARIO_key24 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key24" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key24";
       public            Sistema JD_owner    false    218            �           2606    516529 #   usuario usuario_EMAIL_USUARIO_key25 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key25" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key25";
       public            Sistema JD_owner    false    218            �           2606    516439 #   usuario usuario_EMAIL_USUARIO_key26 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key26" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key26";
       public            Sistema JD_owner    false    218                       2606    516531 #   usuario usuario_EMAIL_USUARIO_key27 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key27" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key27";
       public            Sistema JD_owner    false    218                       2606    516437 #   usuario usuario_EMAIL_USUARIO_key28 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key28" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key28";
       public            Sistema JD_owner    false    218                       2606    516435 #   usuario usuario_EMAIL_USUARIO_key29 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key29" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key29";
       public            Sistema JD_owner    false    218                       2606    516499 "   usuario usuario_EMAIL_USUARIO_key3 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key3" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key3";
       public            Sistema JD_owner    false    218            	           2606    516533 #   usuario usuario_EMAIL_USUARIO_key30 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key30" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key30";
       public            Sistema JD_owner    false    218                       2606    516433 #   usuario usuario_EMAIL_USUARIO_key31 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key31" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key31";
       public            Sistema JD_owner    false    218                       2606    516431 #   usuario usuario_EMAIL_USUARIO_key32 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key32" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key32";
       public            Sistema JD_owner    false    218                       2606    516373 #   usuario usuario_EMAIL_USUARIO_key33 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key33" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key33";
       public            Sistema JD_owner    false    218                       2606    516429 #   usuario usuario_EMAIL_USUARIO_key34 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key34" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key34";
       public            Sistema JD_owner    false    218                       2606    516375 #   usuario usuario_EMAIL_USUARIO_key35 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key35" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key35";
       public            Sistema JD_owner    false    218                       2606    516391 #   usuario usuario_EMAIL_USUARIO_key36 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key36" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key36";
       public            Sistema JD_owner    false    218                       2606    516377 #   usuario usuario_EMAIL_USUARIO_key37 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key37" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key37";
       public            Sistema JD_owner    false    218                       2606    516389 #   usuario usuario_EMAIL_USUARIO_key38 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key38" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key38";
       public            Sistema JD_owner    false    218                       2606    516379 #   usuario usuario_EMAIL_USUARIO_key39 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key39" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key39";
       public            Sistema JD_owner    false    218                       2606    516501 "   usuario usuario_EMAIL_USUARIO_key4 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key4" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key4";
       public            Sistema JD_owner    false    218                       2606    516387 #   usuario usuario_EMAIL_USUARIO_key40 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key40" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key40";
       public            Sistema JD_owner    false    218            !           2606    516381 #   usuario usuario_EMAIL_USUARIO_key41 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key41" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key41";
       public            Sistema JD_owner    false    218            #           2606    516385 #   usuario usuario_EMAIL_USUARIO_key42 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key42" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key42";
       public            Sistema JD_owner    false    218            %           2606    516383 #   usuario usuario_EMAIL_USUARIO_key43 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key43" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key43";
       public            Sistema JD_owner    false    218            '           2606    516543 #   usuario usuario_EMAIL_USUARIO_key44 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key44" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key44";
       public            Sistema JD_owner    false    218            )           2606    516535 #   usuario usuario_EMAIL_USUARIO_key45 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key45" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key45";
       public            Sistema JD_owner    false    218            +           2606    516541 #   usuario usuario_EMAIL_USUARIO_key46 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key46" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key46";
       public            Sistema JD_owner    false    218            -           2606    516537 #   usuario usuario_EMAIL_USUARIO_key47 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key47" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key47";
       public            Sistema JD_owner    false    218            /           2606    516441 #   usuario usuario_EMAIL_USUARIO_key48 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key48" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key48";
       public            Sistema JD_owner    false    218            1           2606    516393 #   usuario usuario_EMAIL_USUARIO_key49 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key49" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key49";
       public            Sistema JD_owner    false    218            3           2606    516503 "   usuario usuario_EMAIL_USUARIO_key5 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key5" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key5";
       public            Sistema JD_owner    false    218            5           2606    516427 #   usuario usuario_EMAIL_USUARIO_key50 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key50" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key50";
       public            Sistema JD_owner    false    218            7           2606    516395 #   usuario usuario_EMAIL_USUARIO_key51 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key51" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key51";
       public            Sistema JD_owner    false    218            9           2606    516425 #   usuario usuario_EMAIL_USUARIO_key52 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key52" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key52";
       public            Sistema JD_owner    false    218            ;           2606    516397 #   usuario usuario_EMAIL_USUARIO_key53 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key53" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key53";
       public            Sistema JD_owner    false    218            =           2606    516423 #   usuario usuario_EMAIL_USUARIO_key54 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key54" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key54";
       public            Sistema JD_owner    false    218            ?           2606    516399 #   usuario usuario_EMAIL_USUARIO_key55 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key55" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key55";
       public            Sistema JD_owner    false    218            A           2606    516421 #   usuario usuario_EMAIL_USUARIO_key56 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key56" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key56";
       public            Sistema JD_owner    false    218            C           2606    516401 #   usuario usuario_EMAIL_USUARIO_key57 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key57" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key57";
       public            Sistema JD_owner    false    218            E           2606    516419 #   usuario usuario_EMAIL_USUARIO_key58 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key58" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key58";
       public            Sistema JD_owner    false    218            G           2606    516403 #   usuario usuario_EMAIL_USUARIO_key59 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key59" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key59";
       public            Sistema JD_owner    false    218            I           2606    516455 "   usuario usuario_EMAIL_USUARIO_key6 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key6" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key6";
       public            Sistema JD_owner    false    218            K           2606    516417 #   usuario usuario_EMAIL_USUARIO_key60 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key60" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key60";
       public            Sistema JD_owner    false    218            M           2606    516405 #   usuario usuario_EMAIL_USUARIO_key61 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key61" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key61";
       public            Sistema JD_owner    false    218            O           2606    516407 #   usuario usuario_EMAIL_USUARIO_key62 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key62" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key62";
       public            Sistema JD_owner    false    218            Q           2606    516415 #   usuario usuario_EMAIL_USUARIO_key63 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key63" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key63";
       public            Sistema JD_owner    false    218            S           2606    516409 #   usuario usuario_EMAIL_USUARIO_key64 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key64" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key64";
       public            Sistema JD_owner    false    218            U           2606    516413 #   usuario usuario_EMAIL_USUARIO_key65 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key65" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key65";
       public            Sistema JD_owner    false    218            W           2606    516411 #   usuario usuario_EMAIL_USUARIO_key66 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key66" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key66";
       public            Sistema JD_owner    false    218            Y           2606    516555 #   usuario usuario_EMAIL_USUARIO_key67 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key67" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key67";
       public            Sistema JD_owner    false    218            [           2606    516545 #   usuario usuario_EMAIL_USUARIO_key68 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key68" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key68";
       public            Sistema JD_owner    false    218            ]           2606    516553 #   usuario usuario_EMAIL_USUARIO_key69 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key69" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key69";
       public            Sistema JD_owner    false    218            _           2606    516505 "   usuario usuario_EMAIL_USUARIO_key7 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key7" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key7";
       public            Sistema JD_owner    false    218            a           2606    516547 #   usuario usuario_EMAIL_USUARIO_key70 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key70" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key70";
       public            Sistema JD_owner    false    218            c           2606    516551 #   usuario usuario_EMAIL_USUARIO_key71 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key71" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key71";
       public            Sistema JD_owner    false    218            e           2606    516479 #   usuario usuario_EMAIL_USUARIO_key72 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key72" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key72";
       public            Sistema JD_owner    false    218            g           2606    516549 #   usuario usuario_EMAIL_USUARIO_key73 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key73" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key73";
       public            Sistema JD_owner    false    218            i           2606    516481 #   usuario usuario_EMAIL_USUARIO_key74 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key74" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key74";
       public            Sistema JD_owner    false    218            k           2606    516493 #   usuario usuario_EMAIL_USUARIO_key75 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key75" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key75";
       public            Sistema JD_owner    false    218            m           2606    516483 #   usuario usuario_EMAIL_USUARIO_key76 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key76" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key76";
       public            Sistema JD_owner    false    218            o           2606    516491 #   usuario usuario_EMAIL_USUARIO_key77 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key77" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key77";
       public            Sistema JD_owner    false    218            q           2606    516485 #   usuario usuario_EMAIL_USUARIO_key78 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key78" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key78";
       public            Sistema JD_owner    false    218            s           2606    516489 #   usuario usuario_EMAIL_USUARIO_key79 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key79" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key79";
       public            Sistema JD_owner    false    218            u           2606    516507 "   usuario usuario_EMAIL_USUARIO_key8 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key8" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key8";
       public            Sistema JD_owner    false    218            w           2606    516487 #   usuario usuario_EMAIL_USUARIO_key80 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key80" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key80";
       public            Sistema JD_owner    false    218            y           2606    516475 #   usuario usuario_EMAIL_USUARIO_key81 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key81" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key81";
       public            Sistema JD_owner    false    218            {           2606    516457 #   usuario usuario_EMAIL_USUARIO_key82 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key82" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key82";
       public            Sistema JD_owner    false    218            }           2606    516473 #   usuario usuario_EMAIL_USUARIO_key83 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key83" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key83";
       public            Sistema JD_owner    false    218                       2606    516459 #   usuario usuario_EMAIL_USUARIO_key84 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key84" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key84";
       public            Sistema JD_owner    false    218            �           2606    516471 #   usuario usuario_EMAIL_USUARIO_key85 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key85" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key85";
       public            Sistema JD_owner    false    218            �           2606    516557 #   usuario usuario_EMAIL_USUARIO_key86 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key86" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key86";
       public            Sistema JD_owner    false    218            �           2606    516559 #   usuario usuario_EMAIL_USUARIO_key87 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key87" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key87";
       public            Sistema JD_owner    false    218            �           2606    516469 #   usuario usuario_EMAIL_USUARIO_key88 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key88" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key88";
       public            Sistema JD_owner    false    218            �           2606    516561 #   usuario usuario_EMAIL_USUARIO_key89 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key89" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key89";
       public            Sistema JD_owner    false    218            �           2606    516509 "   usuario usuario_EMAIL_USUARIO_key9 
   CONSTRAINT     j   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key9" UNIQUE ("EMAIL_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key9";
       public            Sistema JD_owner    false    218            �           2606    516467 #   usuario usuario_EMAIL_USUARIO_key90 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key90" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key90";
       public            Sistema JD_owner    false    218            �           2606    516563 #   usuario usuario_EMAIL_USUARIO_key91 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key91" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key91";
       public            Sistema JD_owner    false    218            �           2606    516465 #   usuario usuario_EMAIL_USUARIO_key92 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key92" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key92";
       public            Sistema JD_owner    false    218            �           2606    516565 #   usuario usuario_EMAIL_USUARIO_key93 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key93" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key93";
       public            Sistema JD_owner    false    218            �           2606    516463 #   usuario usuario_EMAIL_USUARIO_key94 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key94" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key94";
       public            Sistema JD_owner    false    218            �           2606    516567 #   usuario usuario_EMAIL_USUARIO_key95 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key95" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key95";
       public            Sistema JD_owner    false    218            �           2606    516461 #   usuario usuario_EMAIL_USUARIO_key96 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key96" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key96";
       public            Sistema JD_owner    false    218            �           2606    516569 #   usuario usuario_EMAIL_USUARIO_key97 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key97" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key97";
       public            Sistema JD_owner    false    218            �           2606    516371 #   usuario usuario_EMAIL_USUARIO_key98 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key98" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key98";
       public            Sistema JD_owner    false    218            �           2606    516571 #   usuario usuario_EMAIL_USUARIO_key99 
   CONSTRAINT     k   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_EMAIL_USUARIO_key99" UNIQUE ("EMAIL_USUARIO");
 O   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_EMAIL_USUARIO_key99";
       public            Sistema JD_owner    false    218            �           2606    516283    usuario usuario_RUT_USUARIO_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key" UNIQUE ("RUT_USUARIO");
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key";
       public            Sistema JD_owner    false    218            �           2606    516285     usuario usuario_RUT_USUARIO_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key1" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key1";
       public            Sistema JD_owner    false    218            �           2606    516279 !   usuario usuario_RUT_USUARIO_key10 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key10" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key10";
       public            Sistema JD_owner    false    218            �           2606    516139 "   usuario usuario_RUT_USUARIO_key100 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key100" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key100";
       public            Sistema JD_owner    false    218            �           2606    516137 "   usuario usuario_RUT_USUARIO_key101 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key101" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key101";
       public            Sistema JD_owner    false    218            �           2606    516135 "   usuario usuario_RUT_USUARIO_key102 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key102" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key102";
       public            Sistema JD_owner    false    218            �           2606    516133 "   usuario usuario_RUT_USUARIO_key103 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key103" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key103";
       public            Sistema JD_owner    false    218            �           2606    516131 "   usuario usuario_RUT_USUARIO_key104 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key104" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key104";
       public            Sistema JD_owner    false    218            �           2606    516343 "   usuario usuario_RUT_USUARIO_key105 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key105" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key105";
       public            Sistema JD_owner    false    218            �           2606    516129 "   usuario usuario_RUT_USUARIO_key106 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key106" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key106";
       public            Sistema JD_owner    false    218            �           2606    516127 "   usuario usuario_RUT_USUARIO_key107 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key107" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key107";
       public            Sistema JD_owner    false    218            �           2606    516125 "   usuario usuario_RUT_USUARIO_key108 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key108" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key108";
       public            Sistema JD_owner    false    218            �           2606    516123 "   usuario usuario_RUT_USUARIO_key109 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key109" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key109";
       public            Sistema JD_owner    false    218            �           2606    516301 !   usuario usuario_RUT_USUARIO_key11 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key11" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key11";
       public            Sistema JD_owner    false    218            �           2606    516121 "   usuario usuario_RUT_USUARIO_key110 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key110" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key110";
       public            Sistema JD_owner    false    218            �           2606    516119 "   usuario usuario_RUT_USUARIO_key111 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key111" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key111";
       public            Sistema JD_owner    false    218            �           2606    516197 "   usuario usuario_RUT_USUARIO_key112 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key112" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key112";
       public            Sistema JD_owner    false    218            �           2606    516117 "   usuario usuario_RUT_USUARIO_key113 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key113" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key113";
       public            Sistema JD_owner    false    218            �           2606    516115 "   usuario usuario_RUT_USUARIO_key114 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key114" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key114";
       public            Sistema JD_owner    false    218            �           2606    516113 "   usuario usuario_RUT_USUARIO_key115 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key115" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key115";
       public            Sistema JD_owner    false    218            �           2606    516111 "   usuario usuario_RUT_USUARIO_key116 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key116" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key116";
       public            Sistema JD_owner    false    218            �           2606    516109 "   usuario usuario_RUT_USUARIO_key117 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key117" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key117";
       public            Sistema JD_owner    false    218            �           2606    516107 "   usuario usuario_RUT_USUARIO_key118 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key118" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key118";
       public            Sistema JD_owner    false    218            �           2606    516105 "   usuario usuario_RUT_USUARIO_key119 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key119" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key119";
       public            Sistema JD_owner    false    218            �           2606    516277 !   usuario usuario_RUT_USUARIO_key12 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key12" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key12";
       public            Sistema JD_owner    false    218            �           2606    516103 "   usuario usuario_RUT_USUARIO_key120 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key120" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key120";
       public            Sistema JD_owner    false    218            �           2606    516101 "   usuario usuario_RUT_USUARIO_key121 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key121" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key121";
       public            Sistema JD_owner    false    218            �           2606    516099 "   usuario usuario_RUT_USUARIO_key122 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key122" UNIQUE ("RUT_USUARIO");
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key122";
       public            Sistema JD_owner    false    218            �           2606    516303 !   usuario usuario_RUT_USUARIO_key13 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key13" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key13";
       public            Sistema JD_owner    false    218            �           2606    516311 !   usuario usuario_RUT_USUARIO_key14 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key14" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key14";
       public            Sistema JD_owner    false    218            �           2606    516275 !   usuario usuario_RUT_USUARIO_key15 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key15" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key15";
       public            Sistema JD_owner    false    218            �           2606    516313 !   usuario usuario_RUT_USUARIO_key16 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key16" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key16";
       public            Sistema JD_owner    false    218            �           2606    516315 !   usuario usuario_RUT_USUARIO_key17 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key17" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key17";
       public            Sistema JD_owner    false    218            �           2606    516325 !   usuario usuario_RUT_USUARIO_key18 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key18" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key18";
       public            Sistema JD_owner    false    218            �           2606    516323 !   usuario usuario_RUT_USUARIO_key19 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key19" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key19";
       public            Sistema JD_owner    false    218            �           2606    516287     usuario usuario_RUT_USUARIO_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key2" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key2";
       public            Sistema JD_owner    false    218            �           2606    516317 !   usuario usuario_RUT_USUARIO_key20 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key20" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key20";
       public            Sistema JD_owner    false    218            �           2606    516319 !   usuario usuario_RUT_USUARIO_key21 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key21" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key21";
       public            Sistema JD_owner    false    218            �           2606    516321 !   usuario usuario_RUT_USUARIO_key22 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key22" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key22";
       public            Sistema JD_owner    false    218            �           2606    516309 !   usuario usuario_RUT_USUARIO_key23 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key23" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key23";
       public            Sistema JD_owner    false    218            �           2606    516305 !   usuario usuario_RUT_USUARIO_key24 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key24" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key24";
       public            Sistema JD_owner    false    218            �           2606    516307 !   usuario usuario_RUT_USUARIO_key25 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key25" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key25";
       public            Sistema JD_owner    false    218            �           2606    516273 !   usuario usuario_RUT_USUARIO_key26 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key26" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key26";
       public            Sistema JD_owner    false    218            �           2606    516327 !   usuario usuario_RUT_USUARIO_key27 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key27" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key27";
       public            Sistema JD_owner    false    218            �           2606    516271 !   usuario usuario_RUT_USUARIO_key28 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key28" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key28";
       public            Sistema JD_owner    false    218            �           2606    516269 !   usuario usuario_RUT_USUARIO_key29 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key29" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key29";
       public            Sistema JD_owner    false    218            �           2606    516289     usuario usuario_RUT_USUARIO_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key3" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key3";
       public            Sistema JD_owner    false    218            �           2606    516185 !   usuario usuario_RUT_USUARIO_key30 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key30" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key30";
       public            Sistema JD_owner    false    218                       2606    516267 !   usuario usuario_RUT_USUARIO_key31 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key31" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key31";
       public            Sistema JD_owner    false    218                       2606    516265 !   usuario usuario_RUT_USUARIO_key32 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key32" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key32";
       public            Sistema JD_owner    false    218                       2606    516187 !   usuario usuario_RUT_USUARIO_key33 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key33" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key33";
       public            Sistema JD_owner    false    218                       2606    516263 !   usuario usuario_RUT_USUARIO_key34 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key34" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key34";
       public            Sistema JD_owner    false    218            	           2606    516189 !   usuario usuario_RUT_USUARIO_key35 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key35" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key35";
       public            Sistema JD_owner    false    218                       2606    516261 !   usuario usuario_RUT_USUARIO_key36 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key36" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key36";
       public            Sistema JD_owner    false    218                       2606    516191 !   usuario usuario_RUT_USUARIO_key37 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key37" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key37";
       public            Sistema JD_owner    false    218                       2606    516259 !   usuario usuario_RUT_USUARIO_key38 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key38" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key38";
       public            Sistema JD_owner    false    218                       2606    516193 !   usuario usuario_RUT_USUARIO_key39 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key39" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key39";
       public            Sistema JD_owner    false    218                       2606    516291     usuario usuario_RUT_USUARIO_key4 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key4" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key4";
       public            Sistema JD_owner    false    218                       2606    516257 !   usuario usuario_RUT_USUARIO_key40 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key40" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key40";
       public            Sistema JD_owner    false    218                       2606    516195 !   usuario usuario_RUT_USUARIO_key41 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key41" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key41";
       public            Sistema JD_owner    false    218                       2606    516255 !   usuario usuario_RUT_USUARIO_key42 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key42" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key42";
       public            Sistema JD_owner    false    218                       2606    516199 !   usuario usuario_RUT_USUARIO_key43 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key43" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key43";
       public            Sistema JD_owner    false    218                       2606    516253 !   usuario usuario_RUT_USUARIO_key44 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key44" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key44";
       public            Sistema JD_owner    false    218                       2606    516201 !   usuario usuario_RUT_USUARIO_key45 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key45" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key45";
       public            Sistema JD_owner    false    218            !           2606    516251 !   usuario usuario_RUT_USUARIO_key46 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key46" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key46";
       public            Sistema JD_owner    false    218            #           2606    516203 !   usuario usuario_RUT_USUARIO_key47 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key47" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key47";
       public            Sistema JD_owner    false    218            %           2606    516249 !   usuario usuario_RUT_USUARIO_key48 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key48" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key48";
       public            Sistema JD_owner    false    218            '           2606    516205 !   usuario usuario_RUT_USUARIO_key49 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key49" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key49";
       public            Sistema JD_owner    false    218            )           2606    516293     usuario usuario_RUT_USUARIO_key5 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key5" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key5";
       public            Sistema JD_owner    false    218            +           2606    516247 !   usuario usuario_RUT_USUARIO_key50 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key50" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key50";
       public            Sistema JD_owner    false    218            -           2606    516207 !   usuario usuario_RUT_USUARIO_key51 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key51" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key51";
       public            Sistema JD_owner    false    218            /           2606    516245 !   usuario usuario_RUT_USUARIO_key52 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key52" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key52";
       public            Sistema JD_owner    false    218            1           2606    516209 !   usuario usuario_RUT_USUARIO_key53 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key53" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key53";
       public            Sistema JD_owner    false    218            3           2606    516243 !   usuario usuario_RUT_USUARIO_key54 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key54" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key54";
       public            Sistema JD_owner    false    218            5           2606    516211 !   usuario usuario_RUT_USUARIO_key55 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key55" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key55";
       public            Sistema JD_owner    false    218            7           2606    516241 !   usuario usuario_RUT_USUARIO_key56 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key56" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key56";
       public            Sistema JD_owner    false    218            9           2606    516213 !   usuario usuario_RUT_USUARIO_key57 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key57" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key57";
       public            Sistema JD_owner    false    218            ;           2606    516239 !   usuario usuario_RUT_USUARIO_key58 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key58" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key58";
       public            Sistema JD_owner    false    218            =           2606    516215 !   usuario usuario_RUT_USUARIO_key59 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key59" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key59";
       public            Sistema JD_owner    false    218            ?           2606    516281     usuario usuario_RUT_USUARIO_key6 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key6" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key6";
       public            Sistema JD_owner    false    218            A           2606    516237 !   usuario usuario_RUT_USUARIO_key60 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key60" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key60";
       public            Sistema JD_owner    false    218            C           2606    516217 !   usuario usuario_RUT_USUARIO_key61 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key61" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key61";
       public            Sistema JD_owner    false    218            E           2606    516219 !   usuario usuario_RUT_USUARIO_key62 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key62" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key62";
       public            Sistema JD_owner    false    218            G           2606    516235 !   usuario usuario_RUT_USUARIO_key63 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key63" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key63";
       public            Sistema JD_owner    false    218            I           2606    516221 !   usuario usuario_RUT_USUARIO_key64 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key64" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key64";
       public            Sistema JD_owner    false    218            K           2606    516233 !   usuario usuario_RUT_USUARIO_key65 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key65" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key65";
       public            Sistema JD_owner    false    218            M           2606    516223 !   usuario usuario_RUT_USUARIO_key66 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key66" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key66";
       public            Sistema JD_owner    false    218            O           2606    516231 !   usuario usuario_RUT_USUARIO_key67 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key67" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key67";
       public            Sistema JD_owner    false    218            Q           2606    516225 !   usuario usuario_RUT_USUARIO_key68 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key68" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key68";
       public            Sistema JD_owner    false    218            S           2606    516229 !   usuario usuario_RUT_USUARIO_key69 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key69" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key69";
       public            Sistema JD_owner    false    218            U           2606    516295     usuario usuario_RUT_USUARIO_key7 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key7" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key7";
       public            Sistema JD_owner    false    218            W           2606    516227 !   usuario usuario_RUT_USUARIO_key70 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key70" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key70";
       public            Sistema JD_owner    false    218            Y           2606    516183 !   usuario usuario_RUT_USUARIO_key71 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key71" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key71";
       public            Sistema JD_owner    false    218            [           2606    516329 !   usuario usuario_RUT_USUARIO_key72 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key72" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key72";
       public            Sistema JD_owner    false    218            ]           2606    516181 !   usuario usuario_RUT_USUARIO_key73 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key73" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key73";
       public            Sistema JD_owner    false    218            _           2606    516331 !   usuario usuario_RUT_USUARIO_key74 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key74" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key74";
       public            Sistema JD_owner    false    218            a           2606    516179 !   usuario usuario_RUT_USUARIO_key75 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key75" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key75";
       public            Sistema JD_owner    false    218            c           2606    516333 !   usuario usuario_RUT_USUARIO_key76 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key76" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key76";
       public            Sistema JD_owner    false    218            e           2606    516177 !   usuario usuario_RUT_USUARIO_key77 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key77" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key77";
       public            Sistema JD_owner    false    218            g           2606    516335 !   usuario usuario_RUT_USUARIO_key78 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key78" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key78";
       public            Sistema JD_owner    false    218            i           2606    516175 !   usuario usuario_RUT_USUARIO_key79 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key79" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key79";
       public            Sistema JD_owner    false    218            k           2606    516297     usuario usuario_RUT_USUARIO_key8 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key8" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key8";
       public            Sistema JD_owner    false    218            m           2606    516337 !   usuario usuario_RUT_USUARIO_key80 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key80" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key80";
       public            Sistema JD_owner    false    218            o           2606    516173 !   usuario usuario_RUT_USUARIO_key81 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key81" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key81";
       public            Sistema JD_owner    false    218            q           2606    516171 !   usuario usuario_RUT_USUARIO_key82 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key82" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key82";
       public            Sistema JD_owner    false    218            s           2606    516169 !   usuario usuario_RUT_USUARIO_key83 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key83" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key83";
       public            Sistema JD_owner    false    218            u           2606    516167 !   usuario usuario_RUT_USUARIO_key84 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key84" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key84";
       public            Sistema JD_owner    false    218            w           2606    516165 !   usuario usuario_RUT_USUARIO_key85 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key85" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key85";
       public            Sistema JD_owner    false    218            y           2606    516339 !   usuario usuario_RUT_USUARIO_key86 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key86" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key86";
       public            Sistema JD_owner    false    218            {           2606    516163 !   usuario usuario_RUT_USUARIO_key87 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key87" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key87";
       public            Sistema JD_owner    false    218            }           2606    516161 !   usuario usuario_RUT_USUARIO_key88 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key88" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key88";
       public            Sistema JD_owner    false    218                       2606    516159 !   usuario usuario_RUT_USUARIO_key89 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key89" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key89";
       public            Sistema JD_owner    false    218            �           2606    516299     usuario usuario_RUT_USUARIO_key9 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key9" UNIQUE ("RUT_USUARIO");
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key9";
       public            Sistema JD_owner    false    218            �           2606    516157 !   usuario usuario_RUT_USUARIO_key90 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key90" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key90";
       public            Sistema JD_owner    false    218            �           2606    516155 !   usuario usuario_RUT_USUARIO_key91 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key91" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key91";
       public            Sistema JD_owner    false    218            �           2606    516153 !   usuario usuario_RUT_USUARIO_key92 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key92" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key92";
       public            Sistema JD_owner    false    218            �           2606    516151 !   usuario usuario_RUT_USUARIO_key93 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key93" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key93";
       public            Sistema JD_owner    false    218            �           2606    516149 !   usuario usuario_RUT_USUARIO_key94 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key94" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key94";
       public            Sistema JD_owner    false    218            �           2606    516147 !   usuario usuario_RUT_USUARIO_key95 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key95" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key95";
       public            Sistema JD_owner    false    218            �           2606    516145 !   usuario usuario_RUT_USUARIO_key96 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key96" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key96";
       public            Sistema JD_owner    false    218            �           2606    516341 !   usuario usuario_RUT_USUARIO_key97 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key97" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key97";
       public            Sistema JD_owner    false    218            �           2606    516143 !   usuario usuario_RUT_USUARIO_key98 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key98" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key98";
       public            Sistema JD_owner    false    218            �           2606    516141 !   usuario usuario_RUT_USUARIO_key99 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_RUT_USUARIO_key99" UNIQUE ("RUT_USUARIO");
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_RUT_USUARIO_key99";
       public            Sistema JD_owner    false    218            �           2606    57397    usuario usuario_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY ("ID_USUARIO");
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            Sistema JD_owner    false    218            �           2606    516920    OT OT_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OT"
    ADD CONSTRAINT "OT_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE;
 C   ALTER TABLE ONLY public."OT" DROP CONSTRAINT "OT_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    3959    220    234            �           2606    516925    OT OT_ID_INSUMO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."OT"
    ADD CONSTRAINT "OT_ID_INSUMO_fkey" FOREIGN KEY ("ID_INSUMO") REFERENCES public.insumo("ID_INSUMO") ON UPDATE CASCADE;
 B   ALTER TABLE ONLY public."OT" DROP CONSTRAINT "OT_ID_INSUMO_fkey";
       public          Sistema JD_owner    false    232    4035    234            �           2606    516827 7   cliente_metodo_pago cliente_metodo_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    223    220    3959            �           2606    516832 ;   cliente_metodo_pago cliente_metodo_pago_ID_METODO_PAGO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey" FOREIGN KEY ("ID_METODO_PAGO") REFERENCES public.metodos_pago("ID_METODO_PAGO") ON UPDATE CASCADE ON DELETE CASCADE;
 g   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT "cliente_metodo_pago_ID_METODO_PAGO_fkey";
       public          Sistema JD_owner    false    223    222    3961            �           2606    516837 5   contacto_comercial contacto_comercial_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT "contacto_comercial_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT "contacto_comercial_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    220    228    3959            �           2606    516842 7   informacion_de_pago informacion_de_pago_ID_CLIENTE_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT "informacion_de_pago_ID_CLIENTE_fkey" FOREIGN KEY ("ID_CLIENTE") REFERENCES public.cliente("ID_CLIENTE") ON UPDATE CASCADE ON DELETE CASCADE;
 c   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT "informacion_de_pago_ID_CLIENTE_fkey";
       public          Sistema JD_owner    false    226    3959    220            �           2606    516915    insumo insumo_ID_CATEGORIA_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_ID_CATEGORIA_fkey" FOREIGN KEY ("ID_CATEGORIA") REFERENCES public.categoria("ID_CATEGORIA") ON UPDATE CASCADE;
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_ID_CATEGORIA_fkey";
       public          Sistema JD_owner    false    3969    232    230            �           2606    516592     usuario usuario_ROL_USUARIO_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "usuario_ROL_USUARIO_fkey" FOREIGN KEY ("ROL_USUARIO") REFERENCES public.rol("ID_ROL") ON UPDATE CASCADE;
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "usuario_ROL_USUARIO_fkey";
       public          Sistema JD_owner    false    218    3241    216            $           826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            #           826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            p     x�mPAN�0<���vպI�=�Bڋɦ�&%M�a<���d#`%r�G�x�1�pl�) �W��\���@R}���ۉ�_���c�n�A��r�ג�>��b���9u��={5��r����
�2�uY&s�s�`�'�V�+&�a�{VFj
t�Zlp�?�tu��:�P�Ô�_����(�=�1N�=Yv�\�An=ѫ;�S<������S�-���E�y;��+s���+�b��̧�����Tl�EQ|�<vy      l   7   x�3�J-(M-.�/�2��M�����9]�Rsr�L9�S��Ӹb���� ���      b   z  x�]QAn�0<�_�aRv�	J.��q:>�����L��"�SO}B>֥��A�f�3�a	f>/a���x|�I�/~PGh��y����B�R��E���%���;�)>��ip𕒻"=�{�Ép��C�έ�����D�F�L���y`I|
�ݚ�)D����n�.����HH=��'z��@�]�ƃ�JU�emO�[J�֝K줲�g�
u;N�{~\L���R�������X������������'0~꨻�i
tr@�i�S���m�-�|[���������y��iv�i̾1����_�Ӷ��ʬ� ]Y���`��v�@�Ty
��^cf4w�Q�,�,O�N9}]��� ��71��~K��)      e   j   x�5��	�0��*�!��mz��hQ�Ht/ۑuؘك��#��_�B�2 z��;����+�gb�%�&Wvg�M�����xL[y�oh����TD� ɫ�      j   �   x�3�4��*M�S8��(�J�1��41'�*1%�3(�W�
vH��$�%��rj��))XZ��)�����
��FF
��&&\F��F���^��>�0������G��ߗ�����؄�R�����8�8��+F��� �Z$�      h   l   x�3�4��*M�S8��(��3��+H2Rs�R����s9�M�,��ML��-�-8�,9]�\}|�at����������/����rZrprrr��qqq Ojo      n   %  x�mQ;n�0��S���Dn�$@�ր�f�B�l�@�Y�u�r���:CR���!��޻�:����Hҁ�=��1~��w#} ;��s
 8�y�d�⯎ �ҳ�ray�!QxJ胾�T�{�n�#C����
��-r�
����A;8:o	��ΔR�j�Iω:�95n�^݀&�l3��Q���%s�5�x!S"�;;��vf���e�����J��
���H*cn���Y�i��i��|GpU6���/_�v.ޥ��':������-͗���VwǑ�_sZ5M��ֈC      d   �   x�}�;�@Dk�>�z
JgwF�+̆;��	���y�yKjb��B=�!�z�T�+�J����5�{����UOVxM���s���E��	�C��!��t.��}������s� |Z0�D`RN      ^   P   x�3�tL����,.)JL�/�2��JMKUHIUN-*�L���2��$��q�p:5�敤r�r�^���������� ��      `   �  x�u�I��0���W���!	a�S�*n��h�E�fXd����	�챦����R���/X��N�� (	�	���ڷ(;%)��ɹ�Q�:v�K��w����Xzɦ�'Z%Y���n�8���W�g��u]@D��B?�� ��a�a�j`�&	�*l�mH$
e*	�sh��dw���ȗu�o̓�r(�͢8�2VOLS�	,%S�#��Jp���, ] _A(ўd`RJ������'��S�<c�ÕquK��n�2����0�}k��~[��O5����5��P��J��Cy�P�`ȝ0J¨ �$,E�G�� ���/��4�Շ8oq�8��i��@t?vg:�y_��0��֍��R��z����! a���`B�g��F��	�g��+�&2���#�0����rh�R��*Q��rfk;\,Դ�ۦX�m�?��w���^�1���     