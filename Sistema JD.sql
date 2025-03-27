PGDMP                      }        
   Sistema JD    16.8    16.4 }   �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16389 
   Sistema JD    DATABASE     t   CREATE DATABASE "Sistema JD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
    DROP DATABASE "Sistema JD";
                Sistema JD_owner    false            �           0    0    DATABASE "Sistema JD"    ACL     6   GRANT ALL ON DATABASE "Sistema JD" TO neon_superuser;
                   Sistema JD_owner    false    5027            �            1259    360470 	   categoria    TABLE     r   CREATE TABLE public.categoria (
    id_categoria integer NOT NULL,
    nombre_categoria character varying(255)
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
       public          Sistema JD_owner    false    228            �           0    0    categorias_ID_CATEGORIA_seq    SEQUENCE OWNED BY     \   ALTER SEQUENCE public."categorias_ID_CATEGORIA_seq" OWNED BY public.categoria.id_categoria;
          public          Sistema JD_owner    false    227            �            1259    90418    cliente    TABLE     �  CREATE TABLE public.cliente (
    id_cliente integer NOT NULL,
    codigo_cliente character varying(255),
    nombre_razon_social character varying(255) NOT NULL,
    nombre_fantasia character varying(255),
    rut character varying(255),
    giro character varying(255),
    direccion character varying(255),
    ciudad character varying(255),
    comuna character varying(255),
    cliente_vigente boolean DEFAULT true
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
       public          Sistema JD_owner    false    219            �           0    0    cliente_ID_CLIENTE_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."cliente_ID_CLIENTE_seq" OWNED BY public.cliente.id_cliente;
          public          Sistema JD_owner    false    218            �            1259    90502    cliente_metodo_pago    TABLE     �   CREATE TABLE public.cliente_metodo_pago (
    id_cliente integer NOT NULL,
    id_metodo_pago integer NOT NULL,
    id integer NOT NULL
);
 '   DROP TABLE public.cliente_metodo_pago;
       public         heap    Sistema JD_owner    false            �            1259    639558    cliente_metodo_pago_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cliente_metodo_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.cliente_metodo_pago_id_seq;
       public          Sistema JD_owner    false    222            �           0    0    cliente_metodo_pago_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cliente_metodo_pago_id_seq OWNED BY public.cliente_metodo_pago.id;
          public          Sistema JD_owner    false    235            �            1259    229400    contacto_comercial    TABLE     7  CREATE TABLE public.contacto_comercial (
    id_contacto_comercial integer NOT NULL,
    id_cliente integer NOT NULL,
    contacto_comercial character varying(255),
    correo_electronico_comercial character varying(255),
    telefono_fijo character varying(255),
    telefono_celular character varying(255)
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
       public          Sistema JD_owner    false    226            �           0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE OWNED BY        ALTER SEQUENCE public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq" OWNED BY public.contacto_comercial.id_contacto_comercial;
          public          Sistema JD_owner    false    225            �            1259    1032235    control_tiempo    TABLE     8  CREATE TABLE public.control_tiempo (
    id_control_tiempo integer NOT NULL,
    id_it integer,
    fecha date,
    viaje_ida character varying(10),
    trabajo character varying(10),
    viaje_vuelta character varying(10),
    total_hh_viaje character varying(10),
    total_hh_trabajo character varying(10)
);
 "   DROP TABLE public.control_tiempo;
       public         heap    Sistema JD_owner    false            �            1259    1032234 $   control_tiempo_id_control_tiempo_seq    SEQUENCE     �   CREATE SEQUENCE public.control_tiempo_id_control_tiempo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.control_tiempo_id_control_tiempo_seq;
       public          Sistema JD_owner    false    241            �           0    0 $   control_tiempo_id_control_tiempo_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.control_tiempo_id_control_tiempo_seq OWNED BY public.control_tiempo.id_control_tiempo;
          public          Sistema JD_owner    false    240            �            1259    229386    informacion_de_pago    TABLE       CREATE TABLE public.informacion_de_pago (
    id_informacion integer NOT NULL,
    id_cliente integer NOT NULL,
    nombre_responsable character varying(255),
    correo_electronico character varying(255),
    telefono_responsable character varying(255)
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
       public          Sistema JD_owner    false    224            �           0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE OWNED BY     s   ALTER SEQUENCE public."informacion_de_pago_ID_INFORMACION_seq" OWNED BY public.informacion_de_pago.id_informacion;
          public          Sistema JD_owner    false    223            �            1259    1032216    informe_trabajo    TABLE     i  CREATE TABLE public.informe_trabajo (
    id_it integer NOT NULL,
    id_cliente integer,
    id_ot integer,
    maquina character varying(255),
    modelo character varying(255),
    horometro integer,
    numero_serie character varying(100),
    numero_motor character varying(100),
    km_salida integer,
    km_retorno integer,
    queja_sintoma text,
    diagnostico text,
    pieza_falla text,
    observacion text,
    solucion text,
    total_hh character varying(50),
    total_km character varying(50),
    insumo character varying(50),
    tecnico character varying(50),
    id_maquina integer NOT NULL
);
 #   DROP TABLE public.informe_trabajo;
       public         heap    Sistema JD_owner    false            �            1259    1032215    informe_trabajo_id_it_seq    SEQUENCE     �   CREATE SEQUENCE public.informe_trabajo_id_it_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.informe_trabajo_id_it_seq;
       public          Sistema JD_owner    false    239            �           0    0    informe_trabajo_id_it_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.informe_trabajo_id_it_seq OWNED BY public.informe_trabajo.id_it;
          public          Sistema JD_owner    false    238            �            1259    377398    insumo    TABLE     �  CREATE TABLE public.insumo (
    id_insumo integer NOT NULL,
    tipo_insumo character varying(255),
    nombre_insumo character varying(255),
    ubicacion character varying(255),
    cantidad integer,
    costo_unidad double precision,
    sub_total double precision,
    stock_disponible integer,
    precio_neto double precision,
    estado_insumo boolean DEFAULT true,
    id_categoria integer,
    precio_venta double precision
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
       public          Sistema JD_owner    false    230            �           0    0    insumo_ID_INSUMO_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."insumo_ID_INSUMO_seq" OWNED BY public.insumo.id_insumo;
          public          Sistema JD_owner    false    229            �            1259    1302542    maquinas    TABLE       CREATE TABLE public.maquinas (
    id_maquina integer NOT NULL,
    id_cliente integer NOT NULL,
    nombre_maquina character varying(255) NOT NULL,
    modelo_maquina character varying(255),
    numero_serie character varying(100),
    numero_motor character varying(100)
);
    DROP TABLE public.maquinas;
       public         heap    Sistema JD_owner    false            �            1259    1302541    maquinas_id_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.maquinas_id_maquina_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.maquinas_id_maquina_seq;
       public          Sistema JD_owner    false    243            �           0    0    maquinas_id_maquina_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.maquinas_id_maquina_seq OWNED BY public.maquinas.id_maquina;
          public          Sistema JD_owner    false    242            �            1259    90496    metodos_pago    TABLE     �   CREATE TABLE public.metodos_pago (
    id_metodo_pago integer NOT NULL,
    nombre_metodo character varying(255),
    descripcion character varying(255)
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
       public          Sistema JD_owner    false    221            �           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."metodos_pago_ID_METODO_PAGO_seq" OWNED BY public.metodos_pago.id_metodo_pago;
          public          Sistema JD_owner    false    220            �            1259    565267    ot    TABLE     �  CREATE TABLE public.ot (
    id_ot integer NOT NULL,
    id_cliente integer NOT NULL,
    tipo_documento character varying(50),
    fecha_solicitud date,
    fecha_entrega date,
    tipo_ot character varying(50),
    equipo character varying(100),
    numero_serie character varying(100),
    horas_trabajo integer,
    observacion_final text,
    descripcion text,
    sub_total double precision,
    comentario text,
    descuento_global double precision,
    monto_neto double precision,
    monto_exento double precision,
    iva double precision,
    total double precision,
    prioridad character varying(50),
    observacion_inicial character varying(50),
    id_maquina integer NOT NULL
);
    DROP TABLE public.ot;
       public         heap    Sistema JD_owner    false            �            1259    565266    ot_ID_OT_seq    SEQUENCE     �   CREATE SEQUENCE public."ot_ID_OT_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."ot_ID_OT_seq";
       public          Sistema JD_owner    false    232            �           0    0    ot_ID_OT_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."ot_ID_OT_seq" OWNED BY public.ot.id_ot;
          public          Sistema JD_owner    false    231            �            1259    565280 	   ot_insumo    TABLE     A  CREATE TABLE public.ot_insumo (
    id_ot integer NOT NULL,
    id_insumo integer NOT NULL,
    cantidad_insumo integer NOT NULL,
    precio_unitario double precision,
    recargo_insumo double precision,
    af_ex_insumo character varying(10),
    precio_total double precision,
    descuento_insumo double precision
);
    DROP TABLE public.ot_insumo;
       public         heap    Sistema JD_owner    false            �            1259    673625 	   productos    TABLE     f  CREATE TABLE public.productos (
    id_producto integer NOT NULL,
    id_ot integer NOT NULL,
    nombre_producto character varying(255),
    cantidad_producto integer,
    precio_unitario double precision,
    recargo_producto double precision,
    af_ex character varying(255),
    precio_total double precision,
    descuento_producto double precision
);
    DROP TABLE public.productos;
       public         heap    Sistema JD_owner    false            �            1259    673624    productos_id_producto_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_producto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.productos_id_producto_seq;
       public          Sistema JD_owner    false    237            �           0    0    productos_id_producto_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.productos_id_producto_seq OWNED BY public.productos.id_producto;
          public          Sistema JD_owner    false    236            �            1259    57380    rol    TABLE     `   CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    nombre_rol character varying(255)
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
       public          Sistema JD_owner    false    216            �           0    0    rol_ID_ROL_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."rol_ID_ROL_seq" OWNED BY public.rol.id_rol;
          public          Sistema JD_owner    false    215            �            1259    57389    usuario    TABLE     �  CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre_usuario character varying(255),
    apellido_usuario character varying(255),
    rut_usuario character varying(255),
    email_usuario character varying(255),
    contrasenia_usuario character varying(255),
    fecha_nacimiento_usuario timestamp with time zone,
    rol_usuario integer,
    estado_usuario boolean DEFAULT true
);
    DROP TABLE public.usuario;
       public         heap    Sistema JD_owner    false            �            1259    638976    usuario_id_usuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.usuario_id_usuario_seq;
       public          Sistema JD_owner    false    217            �           0    0    usuario_id_usuario_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;
          public          Sistema JD_owner    false    234            �           2604    360473    categoria id_categoria    DEFAULT     �   ALTER TABLE ONLY public.categoria ALTER COLUMN id_categoria SET DEFAULT nextval('public."categorias_ID_CATEGORIA_seq"'::regclass);
 E   ALTER TABLE public.categoria ALTER COLUMN id_categoria DROP DEFAULT;
       public          Sistema JD_owner    false    227    228    228            �           2604    90421    cliente id_cliente    DEFAULT     z   ALTER TABLE ONLY public.cliente ALTER COLUMN id_cliente SET DEFAULT nextval('public."cliente_ID_CLIENTE_seq"'::regclass);
 A   ALTER TABLE public.cliente ALTER COLUMN id_cliente DROP DEFAULT;
       public          Sistema JD_owner    false    219    218    219            �           2604    639559    cliente_metodo_pago id    DEFAULT     �   ALTER TABLE ONLY public.cliente_metodo_pago ALTER COLUMN id SET DEFAULT nextval('public.cliente_metodo_pago_id_seq'::regclass);
 E   ALTER TABLE public.cliente_metodo_pago ALTER COLUMN id DROP DEFAULT;
       public          Sistema JD_owner    false    235    222            �           2604    229403 (   contacto_comercial id_contacto_comercial    DEFAULT     �   ALTER TABLE ONLY public.contacto_comercial ALTER COLUMN id_contacto_comercial SET DEFAULT nextval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"'::regclass);
 W   ALTER TABLE public.contacto_comercial ALTER COLUMN id_contacto_comercial DROP DEFAULT;
       public          Sistema JD_owner    false    226    225    226            �           2604    1032238     control_tiempo id_control_tiempo    DEFAULT     �   ALTER TABLE ONLY public.control_tiempo ALTER COLUMN id_control_tiempo SET DEFAULT nextval('public.control_tiempo_id_control_tiempo_seq'::regclass);
 O   ALTER TABLE public.control_tiempo ALTER COLUMN id_control_tiempo DROP DEFAULT;
       public          Sistema JD_owner    false    240    241    241            �           2604    229389 "   informacion_de_pago id_informacion    DEFAULT     �   ALTER TABLE ONLY public.informacion_de_pago ALTER COLUMN id_informacion SET DEFAULT nextval('public."informacion_de_pago_ID_INFORMACION_seq"'::regclass);
 Q   ALTER TABLE public.informacion_de_pago ALTER COLUMN id_informacion DROP DEFAULT;
       public          Sistema JD_owner    false    224    223    224            �           2604    1032219    informe_trabajo id_it    DEFAULT     ~   ALTER TABLE ONLY public.informe_trabajo ALTER COLUMN id_it SET DEFAULT nextval('public.informe_trabajo_id_it_seq'::regclass);
 D   ALTER TABLE public.informe_trabajo ALTER COLUMN id_it DROP DEFAULT;
       public          Sistema JD_owner    false    239    238    239            �           2604    377401    insumo id_insumo    DEFAULT     v   ALTER TABLE ONLY public.insumo ALTER COLUMN id_insumo SET DEFAULT nextval('public."insumo_ID_INSUMO_seq"'::regclass);
 ?   ALTER TABLE public.insumo ALTER COLUMN id_insumo DROP DEFAULT;
       public          Sistema JD_owner    false    230    229    230            �           2604    1302545    maquinas id_maquina    DEFAULT     z   ALTER TABLE ONLY public.maquinas ALTER COLUMN id_maquina SET DEFAULT nextval('public.maquinas_id_maquina_seq'::regclass);
 B   ALTER TABLE public.maquinas ALTER COLUMN id_maquina DROP DEFAULT;
       public          Sistema JD_owner    false    243    242    243            �           2604    90499    metodos_pago id_metodo_pago    DEFAULT     �   ALTER TABLE ONLY public.metodos_pago ALTER COLUMN id_metodo_pago SET DEFAULT nextval('public."metodos_pago_ID_METODO_PAGO_seq"'::regclass);
 J   ALTER TABLE public.metodos_pago ALTER COLUMN id_metodo_pago DROP DEFAULT;
       public          Sistema JD_owner    false    221    220    221            �           2604    565270    ot id_ot    DEFAULT     f   ALTER TABLE ONLY public.ot ALTER COLUMN id_ot SET DEFAULT nextval('public."ot_ID_OT_seq"'::regclass);
 7   ALTER TABLE public.ot ALTER COLUMN id_ot DROP DEFAULT;
       public          Sistema JD_owner    false    231    232    232            �           2604    673628    productos id_producto    DEFAULT     ~   ALTER TABLE ONLY public.productos ALTER COLUMN id_producto SET DEFAULT nextval('public.productos_id_producto_seq'::regclass);
 D   ALTER TABLE public.productos ALTER COLUMN id_producto DROP DEFAULT;
       public          Sistema JD_owner    false    236    237    237            �           2604    57383 
   rol id_rol    DEFAULT     j   ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public."rol_ID_ROL_seq"'::regclass);
 9   ALTER TABLE public.rol ALTER COLUMN id_rol DROP DEFAULT;
       public          Sistema JD_owner    false    215    216    216            �           2604    638977    usuario id_usuario    DEFAULT     x   ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);
 A   ALTER TABLE public.usuario ALTER COLUMN id_usuario DROP DEFAULT;
       public          Sistema JD_owner    false    234    217            �          0    360470 	   categoria 
   TABLE DATA           C   COPY public.categoria (id_categoria, nombre_categoria) FROM stdin;
    public          Sistema JD_owner    false    228   W�      �          0    90418    cliente 
   TABLE DATA           �   COPY public.cliente (id_cliente, codigo_cliente, nombre_razon_social, nombre_fantasia, rut, giro, direccion, ciudad, comuna, cliente_vigente) FROM stdin;
    public          Sistema JD_owner    false    219   ��      �          0    90502    cliente_metodo_pago 
   TABLE DATA           M   COPY public.cliente_metodo_pago (id_cliente, id_metodo_pago, id) FROM stdin;
    public          Sistema JD_owner    false    222   �      �          0    229400    contacto_comercial 
   TABLE DATA           �   COPY public.contacto_comercial (id_contacto_comercial, id_cliente, contacto_comercial, correo_electronico_comercial, telefono_fijo, telefono_celular) FROM stdin;
    public          Sistema JD_owner    false    226   (�      �          0    1032235    control_tiempo 
   TABLE DATA           �   COPY public.control_tiempo (id_control_tiempo, id_it, fecha, viaje_ida, trabajo, viaje_vuelta, total_hh_viaje, total_hh_trabajo) FROM stdin;
    public          Sistema JD_owner    false    241   �      �          0    229386    informacion_de_pago 
   TABLE DATA           �   COPY public.informacion_de_pago (id_informacion, id_cliente, nombre_responsable, correo_electronico, telefono_responsable) FROM stdin;
    public          Sistema JD_owner    false    224   S�      �          0    1032216    informe_trabajo 
   TABLE DATA             COPY public.informe_trabajo (id_it, id_cliente, id_ot, maquina, modelo, horometro, numero_serie, numero_motor, km_salida, km_retorno, queja_sintoma, diagnostico, pieza_falla, observacion, solucion, total_hh, total_km, insumo, tecnico, id_maquina) FROM stdin;
    public          Sistema JD_owner    false    239   	�      �          0    377398    insumo 
   TABLE DATA           �   COPY public.insumo (id_insumo, tipo_insumo, nombre_insumo, ubicacion, cantidad, costo_unidad, sub_total, stock_disponible, precio_neto, estado_insumo, id_categoria, precio_venta) FROM stdin;
    public          Sistema JD_owner    false    230   \�      �          0    1302542    maquinas 
   TABLE DATA           v   COPY public.maquinas (id_maquina, id_cliente, nombre_maquina, modelo_maquina, numero_serie, numero_motor) FROM stdin;
    public          Sistema JD_owner    false    243   ��      �          0    90496    metodos_pago 
   TABLE DATA           R   COPY public.metodos_pago (id_metodo_pago, nombre_metodo, descripcion) FROM stdin;
    public          Sistema JD_owner    false    221   ��      �          0    565267    ot 
   TABLE DATA           (  COPY public.ot (id_ot, id_cliente, tipo_documento, fecha_solicitud, fecha_entrega, tipo_ot, equipo, numero_serie, horas_trabajo, observacion_final, descripcion, sub_total, comentario, descuento_global, monto_neto, monto_exento, iva, total, prioridad, observacion_inicial, id_maquina) FROM stdin;
    public          Sistema JD_owner    false    232   �      �          0    565280 	   ot_insumo 
   TABLE DATA           �   COPY public.ot_insumo (id_ot, id_insumo, cantidad_insumo, precio_unitario, recargo_insumo, af_ex_insumo, precio_total, descuento_insumo) FROM stdin;
    public          Sistema JD_owner    false    233   ��      �          0    673625 	   productos 
   TABLE DATA           �   COPY public.productos (id_producto, id_ot, nombre_producto, cantidad_producto, precio_unitario, recargo_producto, af_ex, precio_total, descuento_producto) FROM stdin;
    public          Sistema JD_owner    false    237   �      �          0    57380    rol 
   TABLE DATA           1   COPY public.rol (id_rol, nombre_rol) FROM stdin;
    public          Sistema JD_owner    false    216   ռ      �          0    57389    usuario 
   TABLE DATA           �   COPY public.usuario (id_usuario, nombre_usuario, apellido_usuario, rut_usuario, email_usuario, contrasenia_usuario, fecha_nacimiento_usuario, rol_usuario, estado_usuario) FROM stdin;
    public          Sistema JD_owner    false    217   5�      �           0    0    categorias_ID_CATEGORIA_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."categorias_ID_CATEGORIA_seq"', 5, true);
          public          Sistema JD_owner    false    227            �           0    0    cliente_ID_CLIENTE_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."cliente_ID_CLIENTE_seq"', 34, true);
          public          Sistema JD_owner    false    218            �           0    0    cliente_metodo_pago_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.cliente_metodo_pago_id_seq', 15, true);
          public          Sistema JD_owner    false    235            �           0    0 ,   contacto_comercial_ID_CONTACTO_COMERCIAL_seq    SEQUENCE SET     ]   SELECT pg_catalog.setval('public."contacto_comercial_ID_CONTACTO_COMERCIAL_seq"', 27, true);
          public          Sistema JD_owner    false    225            �           0    0 $   control_tiempo_id_control_tiempo_seq    SEQUENCE SET     S   SELECT pg_catalog.setval('public.control_tiempo_id_control_tiempo_seq', 53, true);
          public          Sistema JD_owner    false    240            �           0    0 &   informacion_de_pago_ID_INFORMACION_seq    SEQUENCE SET     W   SELECT pg_catalog.setval('public."informacion_de_pago_ID_INFORMACION_seq"', 27, true);
          public          Sistema JD_owner    false    223            �           0    0    informe_trabajo_id_it_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.informe_trabajo_id_it_seq', 22, true);
          public          Sistema JD_owner    false    238            �           0    0    insumo_ID_INSUMO_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."insumo_ID_INSUMO_seq"', 25, true);
          public          Sistema JD_owner    false    229            �           0    0    maquinas_id_maquina_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.maquinas_id_maquina_seq', 6, true);
          public          Sistema JD_owner    false    242            �           0    0    metodos_pago_ID_METODO_PAGO_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public."metodos_pago_ID_METODO_PAGO_seq"', 6, true);
          public          Sistema JD_owner    false    220            �           0    0    ot_ID_OT_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."ot_ID_OT_seq"', 44, true);
          public          Sistema JD_owner    false    231            �           0    0    productos_id_producto_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.productos_id_producto_seq', 131, true);
          public          Sistema JD_owner    false    236            �           0    0    rol_ID_ROL_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."rol_ID_ROL_seq"', 15, true);
          public          Sistema JD_owner    false    215            �           0    0    usuario_id_usuario_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 5, true);
          public          Sistema JD_owner    false    234            A           2606    360475    categoria categorias_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id_categoria);
 C   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categorias_pkey;
       public            Sistema JD_owner    false    228                       2606    1319564    cliente cliente_RUT_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key" UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key";
       public            Sistema JD_owner    false    219                       2606    1319566    cliente cliente_RUT_key1 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key1" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key1";
       public            Sistema JD_owner    false    219                       2606    1319944    cliente cliente_RUT_key10 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key10" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key10";
       public            Sistema JD_owner    false    219                       2606    1319714    cliente cliente_RUT_key100 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key100" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key100";
       public            Sistema JD_owner    false    219                       2606    1319712    cliente cliente_RUT_key101 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key101" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key101";
       public            Sistema JD_owner    false    219                       2606    1319584    cliente cliente_RUT_key102 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key102" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key102";
       public            Sistema JD_owner    false    219                       2606    1319916    cliente cliente_RUT_key103 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key103" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key103";
       public            Sistema JD_owner    false    219                       2606    1319940    cliente cliente_RUT_key104 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key104" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key104";
       public            Sistema JD_owner    false    219                       2606    1319918    cliente cliente_RUT_key105 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key105" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key105";
       public            Sistema JD_owner    false    219                       2606    1319938    cliente cliente_RUT_key106 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key106" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key106";
       public            Sistema JD_owner    false    219                       2606    1319924    cliente cliente_RUT_key107 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key107" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key107";
       public            Sistema JD_owner    false    219            !           2606    1319936    cliente cliente_RUT_key108 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key108" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key108";
       public            Sistema JD_owner    false    219            #           2606    1319926    cliente cliente_RUT_key109 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key109" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key109";
       public            Sistema JD_owner    false    219            %           2606    1319946    cliente cliente_RUT_key11 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key11" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key11";
       public            Sistema JD_owner    false    219            '           2606    1319934    cliente cliente_RUT_key110 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key110" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key110";
       public            Sistema JD_owner    false    219            )           2606    1319840    cliente cliente_RUT_key111 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key111" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key111";
       public            Sistema JD_owner    false    219            +           2606    1319932    cliente cliente_RUT_key112 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key112" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key112";
       public            Sistema JD_owner    false    219            -           2606    1319856    cliente cliente_RUT_key113 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key113" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key113";
       public            Sistema JD_owner    false    219            /           2606    1319930    cliente cliente_RUT_key114 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key114" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key114";
       public            Sistema JD_owner    false    219            1           2606    1319854    cliente cliente_RUT_key115 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key115" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key115";
       public            Sistema JD_owner    false    219            3           2606    1319928    cliente cliente_RUT_key116 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key116" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key116";
       public            Sistema JD_owner    false    219            5           2606    1319896    cliente cliente_RUT_key117 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key117" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key117";
       public            Sistema JD_owner    false    219            7           2606    1319802    cliente cliente_RUT_key118 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key118" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key118";
       public            Sistema JD_owner    false    219            9           2606    1319588    cliente cliente_RUT_key119 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key119" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key119";
       public            Sistema JD_owner    false    219            ;           2606    1319902    cliente cliente_RUT_key12 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key12" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key12";
       public            Sistema JD_owner    false    219            =           2606    1319692    cliente cliente_RUT_key120 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key120" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key120";
       public            Sistema JD_owner    false    219            ?           2606    1319590    cliente cliente_RUT_key121 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key121" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key121";
       public            Sistema JD_owner    false    219            A           2606    1320022    cliente cliente_RUT_key122 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key122" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key122";
       public            Sistema JD_owner    false    219            C           2606    1319594    cliente cliente_RUT_key123 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key123" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key123";
       public            Sistema JD_owner    false    219            E           2606    1320018    cliente cliente_RUT_key124 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key124" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key124";
       public            Sistema JD_owner    false    219            G           2606    1319596    cliente cliente_RUT_key125 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key125" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key125";
       public            Sistema JD_owner    false    219            I           2606    1320012    cliente cliente_RUT_key126 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key126" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key126";
       public            Sistema JD_owner    false    219            K           2606    1319598    cliente cliente_RUT_key127 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key127" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key127";
       public            Sistema JD_owner    false    219            M           2606    1320010    cliente cliente_RUT_key128 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key128" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key128";
       public            Sistema JD_owner    false    219            O           2606    1319600    cliente cliente_RUT_key129 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key129" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key129";
       public            Sistema JD_owner    false    219            Q           2606    1319950    cliente cliente_RUT_key13 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key13" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key13";
       public            Sistema JD_owner    false    219            S           2606    1320008    cliente cliente_RUT_key130 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key130" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key130";
       public            Sistema JD_owner    false    219            U           2606    1319992    cliente cliente_RUT_key131 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key131" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key131";
       public            Sistema JD_owner    false    219            W           2606    1320006    cliente cliente_RUT_key132 
   CONSTRAINT     V   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key132" UNIQUE (rut);
 F   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key132";
       public            Sistema JD_owner    false    219            Y           2606    1319954    cliente cliente_RUT_key14 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key14" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key14";
       public            Sistema JD_owner    false    219            [           2606    1319898    cliente cliente_RUT_key15 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key15" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key15";
       public            Sistema JD_owner    false    219            ]           2606    1319956    cliente cliente_RUT_key16 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key16" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key16";
       public            Sistema JD_owner    false    219            _           2606    1319552    cliente cliente_RUT_key17 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key17" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key17";
       public            Sistema JD_owner    false    219            a           2606    1319710    cliente cliente_RUT_key18 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key18" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key18";
       public            Sistema JD_owner    false    219            c           2606    1319704    cliente cliente_RUT_key19 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key19" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key19";
       public            Sistema JD_owner    false    219            e           2606    1319570    cliente cliente_RUT_key2 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key2" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key2";
       public            Sistema JD_owner    false    219            g           2606    1319958    cliente cliente_RUT_key20 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key20" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key20";
       public            Sistema JD_owner    false    219            i           2606    1319702    cliente cliente_RUT_key21 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key21" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key21";
       public            Sistema JD_owner    false    219            k           2606    1319962    cliente cliente_RUT_key22 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key22" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key22";
       public            Sistema JD_owner    false    219            m           2606    1319986    cliente cliente_RUT_key23 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key23" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key23";
       public            Sistema JD_owner    false    219            o           2606    1319964    cliente cliente_RUT_key24 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key24" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key24";
       public            Sistema JD_owner    false    219            q           2606    1319984    cliente cliente_RUT_key25 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key25" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key25";
       public            Sistema JD_owner    false    219            s           2606    1319966    cliente cliente_RUT_key26 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key26" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key26";
       public            Sistema JD_owner    false    219            u           2606    1319980    cliente cliente_RUT_key27 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key27" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key27";
       public            Sistema JD_owner    false    219            w           2606    1319972    cliente cliente_RUT_key28 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key28" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key28";
       public            Sistema JD_owner    false    219            y           2606    1319978    cliente cliente_RUT_key29 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key29" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key29";
       public            Sistema JD_owner    false    219            {           2606    1319572    cliente cliente_RUT_key3 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key3" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key3";
       public            Sistema JD_owner    false    219            }           2606    1319974    cliente cliente_RUT_key30 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key30" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key30";
       public            Sistema JD_owner    false    219                       2606    1319976    cliente cliente_RUT_key31 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key31" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key31";
       public            Sistema JD_owner    false    219            �           2606    1319766    cliente cliente_RUT_key32 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key32" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key32";
       public            Sistema JD_owner    false    219            �           2606    1319562    cliente cliente_RUT_key33 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key33" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key33";
       public            Sistema JD_owner    false    219            �           2606    1319764    cliente cliente_RUT_key34 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key34" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key34";
       public            Sistema JD_owner    false    219            �           2606    1319952    cliente cliente_RUT_key35 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key35" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key35";
       public            Sistema JD_owner    false    219            �           2606    1319912    cliente cliente_RUT_key36 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key36" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key36";
       public            Sistema JD_owner    false    219            �           2606    1319560    cliente cliente_RUT_key37 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key37" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key37";
       public            Sistema JD_owner    false    219            �           2606    1319554    cliente cliente_RUT_key38 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key38" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key38";
       public            Sistema JD_owner    false    219            �           2606    1319558    cliente cliente_RUT_key39 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key39" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key39";
       public            Sistema JD_owner    false    219            �           2606    1319908    cliente cliente_RUT_key4 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key4" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key4";
       public            Sistema JD_owner    false    219            �           2606    1319556    cliente cliente_RUT_key40 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key40" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key40";
       public            Sistema JD_owner    false    219            �           2606    1319960    cliente cliente_RUT_key41 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key41" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key41";
       public            Sistema JD_owner    false    219            �           2606    1319754    cliente cliente_RUT_key42 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key42" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key42";
       public            Sistema JD_owner    false    219            �           2606    1319970    cliente cliente_RUT_key43 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key43" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key43";
       public            Sistema JD_owner    false    219            �           2606    1319574    cliente cliente_RUT_key44 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key44" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key44";
       public            Sistema JD_owner    false    219            �           2606    1319752    cliente cliente_RUT_key45 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key45" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key45";
       public            Sistema JD_owner    false    219            �           2606    1319578    cliente cliente_RUT_key46 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key46" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key46";
       public            Sistema JD_owner    false    219            �           2606    1319750    cliente cliente_RUT_key47 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key47" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key47";
       public            Sistema JD_owner    false    219            �           2606    1319580    cliente cliente_RUT_key48 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key48" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key48";
       public            Sistema JD_owner    false    219            �           2606    1319748    cliente cliente_RUT_key49 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key49" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key49";
       public            Sistema JD_owner    false    219            �           2606    1319756    cliente cliente_RUT_key5 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key5" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key5";
       public            Sistema JD_owner    false    219            �           2606    1319582    cliente cliente_RUT_key50 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key50" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key50";
       public            Sistema JD_owner    false    219            �           2606    1319586    cliente cliente_RUT_key51 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key51" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key51";
       public            Sistema JD_owner    false    219            �           2606    1319726    cliente cliente_RUT_key52 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key52" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key52";
       public            Sistema JD_owner    false    219            �           2606    1319694    cliente cliente_RUT_key53 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key53" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key53";
       public            Sistema JD_owner    false    219            �           2606    1319724    cliente cliente_RUT_key54 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key54" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key54";
       public            Sistema JD_owner    false    219            �           2606    1319720    cliente cliente_RUT_key55 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key55" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key55";
       public            Sistema JD_owner    false    219            �           2606    1319718    cliente cliente_RUT_key56 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key56" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key56";
       public            Sistema JD_owner    false    219            �           2606    1319696    cliente cliente_RUT_key57 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key57" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key57";
       public            Sistema JD_owner    false    219            �           2606    1319716    cliente cliente_RUT_key58 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key58" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key58";
       public            Sistema JD_owner    false    219            �           2606    1319698    cliente cliente_RUT_key59 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key59" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key59";
       public            Sistema JD_owner    false    219            �           2606    1319758    cliente cliente_RUT_key6 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key6" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key6";
       public            Sistema JD_owner    false    219            �           2606    1319942    cliente cliente_RUT_key60 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key60" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key60";
       public            Sistema JD_owner    false    219            �           2606    1319768    cliente cliente_RUT_key61 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key61" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key61";
       public            Sistema JD_owner    false    219            �           2606    1319550    cliente cliente_RUT_key62 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key62" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key62";
       public            Sistema JD_owner    false    219            �           2606    1319772    cliente cliente_RUT_key63 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key63" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key63";
       public            Sistema JD_owner    false    219            �           2606    1319548    cliente cliente_RUT_key64 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key64" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key64";
       public            Sistema JD_owner    false    219            �           2606    1319776    cliente cliente_RUT_key65 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key65" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key65";
       public            Sistema JD_owner    false    219            �           2606    1319546    cliente cliente_RUT_key66 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key66" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key66";
       public            Sistema JD_owner    false    219            �           2606    1319778    cliente cliente_RUT_key67 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key67" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key67";
       public            Sistema JD_owner    false    219            �           2606    1319544    cliente cliente_RUT_key68 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key68" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key68";
       public            Sistema JD_owner    false    219            �           2606    1319542    cliente cliente_RUT_key69 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key69" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key69";
       public            Sistema JD_owner    false    219            �           2606    1319906    cliente cliente_RUT_key7 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key7" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key7";
       public            Sistema JD_owner    false    219            �           2606    1319910    cliente cliente_RUT_key70 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key70" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key70";
       public            Sistema JD_owner    false    219            �           2606    1319780    cliente cliente_RUT_key71 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key71" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key71";
       public            Sistema JD_owner    false    219            �           2606    1319852    cliente cliente_RUT_key72 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key72" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key72";
       public            Sistema JD_owner    false    219            �           2606    1319948    cliente cliente_RUT_key73 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key73" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key73";
       public            Sistema JD_owner    false    219            �           2606    1319848    cliente cliente_RUT_key74 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key74" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key74";
       public            Sistema JD_owner    false    219            �           2606    1319782    cliente cliente_RUT_key75 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key75" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key75";
       public            Sistema JD_owner    false    219            �           2606    1319846    cliente cliente_RUT_key76 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key76" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key76";
       public            Sistema JD_owner    false    219            �           2606    1319786    cliente cliente_RUT_key77 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key77" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key77";
       public            Sistema JD_owner    false    219            �           2606    1319844    cliente cliente_RUT_key78 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key78" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key78";
       public            Sistema JD_owner    false    219            �           2606    1319804    cliente cliente_RUT_key79 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key79" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key79";
       public            Sistema JD_owner    false    219            �           2606    1319760    cliente cliente_RUT_key8 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key8" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key8";
       public            Sistema JD_owner    false    219            �           2606    1319842    cliente cliente_RUT_key80 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key80" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key80";
       public            Sistema JD_owner    false    219            �           2606    1319806    cliente cliente_RUT_key81 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key81" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key81";
       public            Sistema JD_owner    false    219            �           2606    1319838    cliente cliente_RUT_key82 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key82" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key82";
       public            Sistema JD_owner    false    219            �           2606    1319808    cliente cliente_RUT_key83 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key83" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key83";
       public            Sistema JD_owner    false    219            �           2606    1319836    cliente cliente_RUT_key84 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key84" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key84";
       public            Sistema JD_owner    false    219            �           2606    1319810    cliente cliente_RUT_key85 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key85" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key85";
       public            Sistema JD_owner    false    219            �           2606    1319834    cliente cliente_RUT_key86 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key86" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key86";
       public            Sistema JD_owner    false    219            �           2606    1319812    cliente cliente_RUT_key87 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key87" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key87";
       public            Sistema JD_owner    false    219            �           2606    1319832    cliente cliente_RUT_key88 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key88" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key88";
       public            Sistema JD_owner    false    219            �           2606    1319814    cliente cliente_RUT_key89 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key89" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key89";
       public            Sistema JD_owner    false    219            �           2606    1319904    cliente cliente_RUT_key9 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key9" UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key9";
       public            Sistema JD_owner    false    219                       2606    1319830    cliente cliente_RUT_key90 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key90" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key90";
       public            Sistema JD_owner    false    219                       2606    1319820    cliente cliente_RUT_key91 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key91" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key91";
       public            Sistema JD_owner    false    219                       2606    1319828    cliente cliente_RUT_key92 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key92" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key92";
       public            Sistema JD_owner    false    219                       2606    1319822    cliente cliente_RUT_key93 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key93" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key93";
       public            Sistema JD_owner    false    219            	           2606    1319826    cliente cliente_RUT_key94 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key94" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key94";
       public            Sistema JD_owner    false    219                       2606    1319968    cliente cliente_RUT_key95 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key95" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key95";
       public            Sistema JD_owner    false    219                       2606    1319800    cliente cliente_RUT_key96 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key96" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key96";
       public            Sistema JD_owner    false    219                       2606    1319794    cliente cliente_RUT_key97 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key97" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key97";
       public            Sistema JD_owner    false    219                       2606    1319798    cliente cliente_RUT_key98 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key98" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key98";
       public            Sistema JD_owner    false    219                       2606    1319796    cliente cliente_RUT_key99 
   CONSTRAINT     U   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT "cliente_RUT_key99" UNIQUE (rut);
 E   ALTER TABLE ONLY public.cliente DROP CONSTRAINT "cliente_RUT_key99";
       public            Sistema JD_owner    false    219            ;           2606    90506 ,   cliente_metodo_pago cliente_metodo_pago_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_pkey PRIMARY KEY (id_cliente, id_metodo_pago);
 V   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_pkey;
       public            Sistema JD_owner    false    222    222                       2606    90426    cliente cliente_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id_cliente);
 >   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_pkey;
       public            Sistema JD_owner    false    219                       2606    1320004    cliente cliente_rut_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key UNIQUE (rut);
 A   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key;
       public            Sistema JD_owner    false    219                       2606    1320002    cliente cliente_rut_key1 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key1 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key1;
       public            Sistema JD_owner    false    219                       2606    1319538    cliente cliente_rut_key10 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key10 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key10;
       public            Sistema JD_owner    false    219                       2606    1319654    cliente cliente_rut_key100 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key100 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key100;
       public            Sistema JD_owner    false    219                       2606    1319982    cliente cliente_rut_key101 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key101 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key101;
       public            Sistema JD_owner    false    219            !           2606    1319606    cliente cliente_rut_key102 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key102 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key102;
       public            Sistema JD_owner    false    219            #           2606    1319652    cliente cliente_rut_key103 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key103 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key103;
       public            Sistema JD_owner    false    219            %           2606    1319684    cliente cliente_rut_key104 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key104 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key104;
       public            Sistema JD_owner    false    219            '           2606    1319650    cliente cliente_rut_key105 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key105 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key105;
       public            Sistema JD_owner    false    219            )           2606    1319592    cliente cliente_rut_key106 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key106 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key106;
       public            Sistema JD_owner    false    219            +           2606    1319648    cliente cliente_rut_key107 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key107 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key107;
       public            Sistema JD_owner    false    219            -           2606    1319608    cliente cliente_rut_key108 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key108 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key108;
       public            Sistema JD_owner    false    219            /           2606    1319646    cliente cliente_rut_key109 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key109 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key109;
       public            Sistema JD_owner    false    219            1           2606    1319860    cliente cliente_rut_key11 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key11 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key11;
       public            Sistema JD_owner    false    219            3           2606    1319770    cliente cliente_rut_key110 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key110 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key110;
       public            Sistema JD_owner    false    219            5           2606    1319644    cliente cliente_rut_key111 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key111 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key111;
       public            Sistema JD_owner    false    219            7           2606    1320046    cliente cliente_rut_key112 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key112 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key112;
       public            Sistema JD_owner    false    219            9           2606    1319642    cliente cliente_rut_key113 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key113 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key113;
       public            Sistema JD_owner    false    219            ;           2606    1319568    cliente cliente_rut_key114 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key114 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key114;
       public            Sistema JD_owner    false    219            =           2606    1319640    cliente cliente_rut_key115 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key115 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key115;
       public            Sistema JD_owner    false    219            ?           2606    1319638    cliente cliente_rut_key116 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key116 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key116;
       public            Sistema JD_owner    false    219            A           2606    1320038    cliente cliente_rut_key117 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key117 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key117;
       public            Sistema JD_owner    false    219            C           2606    1319636    cliente cliente_rut_key118 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key118 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key118;
       public            Sistema JD_owner    false    219            E           2606    1319540    cliente cliente_rut_key119 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key119 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key119;
       public            Sistema JD_owner    false    219            G           2606    1319536    cliente cliente_rut_key12 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key12 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key12;
       public            Sistema JD_owner    false    219            I           2606    1319634    cliente cliente_rut_key120 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key120 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key120;
       public            Sistema JD_owner    false    219            K           2606    1319610    cliente cliente_rut_key121 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key121 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key121;
       public            Sistema JD_owner    false    219            M           2606    1319632    cliente cliente_rut_key122 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key122 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key122;
       public            Sistema JD_owner    false    219            O           2606    1319612    cliente cliente_rut_key123 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key123 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key123;
       public            Sistema JD_owner    false    219            Q           2606    1319630    cliente cliente_rut_key124 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key124 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key124;
       public            Sistema JD_owner    false    219            S           2606    1319614    cliente cliente_rut_key125 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key125 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key125;
       public            Sistema JD_owner    false    219            U           2606    1319628    cliente cliente_rut_key126 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key126 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key126;
       public            Sistema JD_owner    false    219            W           2606    1319616    cliente cliente_rut_key127 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key127 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key127;
       public            Sistema JD_owner    false    219            Y           2606    1319626    cliente cliente_rut_key128 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key128 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key128;
       public            Sistema JD_owner    false    219            [           2606    1319618    cliente cliente_rut_key129 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key129 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key129;
       public            Sistema JD_owner    false    219            ]           2606    1319862    cliente cliente_rut_key13 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key13 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key13;
       public            Sistema JD_owner    false    219            _           2606    1319624    cliente cliente_rut_key130 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key130 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key130;
       public            Sistema JD_owner    false    219            a           2606    1319620    cliente cliente_rut_key131 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key131 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key131;
       public            Sistema JD_owner    false    219            c           2606    1319722    cliente cliente_rut_key132 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key132 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key132;
       public            Sistema JD_owner    false    219            e           2606    1319622    cliente cliente_rut_key133 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key133 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key133;
       public            Sistema JD_owner    false    219            g           2606    1319864    cliente cliente_rut_key134 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key134 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key134;
       public            Sistema JD_owner    false    219            i           2606    1319518    cliente cliente_rut_key135 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key135 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key135;
       public            Sistema JD_owner    false    219            k           2606    1320028    cliente cliente_rut_key136 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key136 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key136;
       public            Sistema JD_owner    false    219            m           2606    1319516    cliente cliente_rut_key137 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key137 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key137;
       public            Sistema JD_owner    false    219            o           2606    1320060    cliente cliente_rut_key138 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key138 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key138;
       public            Sistema JD_owner    false    219            q           2606    1319514    cliente cliente_rut_key139 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key139 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key139;
       public            Sistema JD_owner    false    219            s           2606    1319892    cliente cliente_rut_key14 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key14 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key14;
       public            Sistema JD_owner    false    219            u           2606    1319878    cliente cliente_rut_key140 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key140 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key140;
       public            Sistema JD_owner    false    219            w           2606    1319512    cliente cliente_rut_key141 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key141 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key141;
       public            Sistema JD_owner    false    219            y           2606    1320062    cliente cliente_rut_key142 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key142 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key142;
       public            Sistema JD_owner    false    219            {           2606    1319510    cliente cliente_rut_key143 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key143 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key143;
       public            Sistema JD_owner    false    219            }           2606    1319508    cliente cliente_rut_key144 
   CONSTRAINT     T   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key144 UNIQUE (rut);
 D   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key144;
       public            Sistema JD_owner    false    219                       2606    1319866    cliente cliente_rut_key15 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key15 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key15;
       public            Sistema JD_owner    false    219            �           2606    1319890    cliente cliente_rut_key16 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key16 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key16;
       public            Sistema JD_owner    false    219            �           2606    1319886    cliente cliente_rut_key17 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key17 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key17;
       public            Sistema JD_owner    false    219            �           2606    1319870    cliente cliente_rut_key18 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key18 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key18;
       public            Sistema JD_owner    false    219            �           2606    1319884    cliente cliente_rut_key19 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key19 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key19;
       public            Sistema JD_owner    false    219            �           2606    1319994    cliente cliente_rut_key2 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key2 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key2;
       public            Sistema JD_owner    false    219            �           2606    1319882    cliente cliente_rut_key20 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key20 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key20;
       public            Sistema JD_owner    false    219            �           2606    1319872    cliente cliente_rut_key21 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key21 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key21;
       public            Sistema JD_owner    false    219            �           2606    1319532    cliente cliente_rut_key22 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key22 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key22;
       public            Sistema JD_owner    false    219            �           2606    1319874    cliente cliente_rut_key23 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key23 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key23;
       public            Sistema JD_owner    false    219            �           2606    1319530    cliente cliente_rut_key24 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key24 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key24;
       public            Sistema JD_owner    false    219            �           2606    1319876    cliente cliente_rut_key25 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key25 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key25;
       public            Sistema JD_owner    false    219            �           2606    1319528    cliente cliente_rut_key26 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key26 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key26;
       public            Sistema JD_owner    false    219            �           2606    1319734    cliente cliente_rut_key27 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key27 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key27;
       public            Sistema JD_owner    false    219            �           2606    1319526    cliente cliente_rut_key28 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key28 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key28;
       public            Sistema JD_owner    false    219            �           2606    1319736    cliente cliente_rut_key29 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key29 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key29;
       public            Sistema JD_owner    false    219            �           2606    1320000    cliente cliente_rut_key3 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key3 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key3;
       public            Sistema JD_owner    false    219            �           2606    1319524    cliente cliente_rut_key30 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key30 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key30;
       public            Sistema JD_owner    false    219            �           2606    1320024    cliente cliente_rut_key31 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key31 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key31;
       public            Sistema JD_owner    false    219            �           2606    1319522    cliente cliente_rut_key32 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key32 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key32;
       public            Sistema JD_owner    false    219            �           2606    1319792    cliente cliente_rut_key33 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key33 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key33;
       public            Sistema JD_owner    false    219            �           2606    1319520    cliente cliente_rut_key34 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key34 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key34;
       public            Sistema JD_owner    false    219            �           2606    1319996    cliente cliente_rut_key35 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key35 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key35;
       public            Sistema JD_owner    false    219            �           2606    1320058    cliente cliente_rut_key36 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key36 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key36;
       public            Sistema JD_owner    false    219            �           2606    1320016    cliente cliente_rut_key37 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key37 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key37;
       public            Sistema JD_owner    false    219            �           2606    1320056    cliente cliente_rut_key38 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key38 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key38;
       public            Sistema JD_owner    false    219            �           2606    1320020    cliente cliente_rut_key39 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key39 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key39;
       public            Sistema JD_owner    false    219            �           2606    1319998    cliente cliente_rut_key4 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key4 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key4;
       public            Sistema JD_owner    false    219            �           2606    1320054    cliente cliente_rut_key40 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key40 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key40;
       public            Sistema JD_owner    false    219            �           2606    1320014    cliente cliente_rut_key41 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key41 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key41;
       public            Sistema JD_owner    false    219            �           2606    1320052    cliente cliente_rut_key42 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key42 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key42;
       public            Sistema JD_owner    false    219            �           2606    1320026    cliente cliente_rut_key43 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key43 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key43;
       public            Sistema JD_owner    false    219            �           2606    1320050    cliente cliente_rut_key44 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key44 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key44;
       public            Sistema JD_owner    false    219            �           2606    1320048    cliente cliente_rut_key45 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key45 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key45;
       public            Sistema JD_owner    false    219            �           2606    1319824    cliente cliente_rut_key46 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key46 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key46;
       public            Sistema JD_owner    false    219            �           2606    1320044    cliente cliente_rut_key47 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key47 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key47;
       public            Sistema JD_owner    false    219            �           2606    1320030    cliente cliente_rut_key48 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key48 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key48;
       public            Sistema JD_owner    false    219            �           2606    1320042    cliente cliente_rut_key49 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key49 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key49;
       public            Sistema JD_owner    false    219            �           2606    1319746    cliente cliente_rut_key5 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key5 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key5;
       public            Sistema JD_owner    false    219            �           2606    1320032    cliente cliente_rut_key50 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key50 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key50;
       public            Sistema JD_owner    false    219            �           2606    1320040    cliente cliente_rut_key51 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key51 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key51;
       public            Sistema JD_owner    false    219            �           2606    1320034    cliente cliente_rut_key52 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key52 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key52;
       public            Sistema JD_owner    false    219            �           2606    1320036    cliente cliente_rut_key53 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key53 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key53;
       public            Sistema JD_owner    false    219            �           2606    1319788    cliente cliente_rut_key54 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key54 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key54;
       public            Sistema JD_owner    false    219            �           2606    1319888    cliente cliente_rut_key55 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key55 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key55;
       public            Sistema JD_owner    false    219            �           2606    1319700    cliente cliente_rut_key56 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key56 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key56;
       public            Sistema JD_owner    false    219            �           2606    1319920    cliente cliente_rut_key57 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key57 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key57;
       public            Sistema JD_owner    false    219            �           2606    1319990    cliente cliente_rut_key58 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key58 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key58;
       public            Sistema JD_owner    false    219            �           2606    1319708    cliente cliente_rut_key59 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key59 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key59;
       public            Sistema JD_owner    false    219            �           2606    1319730    cliente cliente_rut_key6 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key6 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key6;
       public            Sistema JD_owner    false    219            �           2606    1319988    cliente cliente_rut_key60 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key60 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key60;
       public            Sistema JD_owner    false    219            �           2606    1319706    cliente cliente_rut_key61 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key61 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key61;
       public            Sistema JD_owner    false    219            �           2606    1319534    cliente cliente_rut_key62 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key62 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key62;
       public            Sistema JD_owner    false    219            �           2606    1319900    cliente cliente_rut_key63 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key63 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key63;
       public            Sistema JD_owner    false    219            �           2606    1319894    cliente cliente_rut_key64 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key64 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key64;
       public            Sistema JD_owner    false    219            �           2606    1319880    cliente cliente_rut_key65 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key65 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key65;
       public            Sistema JD_owner    false    219            �           2606    1319850    cliente cliente_rut_key66 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key66 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key66;
       public            Sistema JD_owner    false    219            �           2606    1319738    cliente cliente_rut_key67 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key67 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key67;
       public            Sistema JD_owner    false    219            �           2606    1319690    cliente cliente_rut_key68 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key68 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key68;
       public            Sistema JD_owner    false    219            �           2606    1319762    cliente cliente_rut_key69 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key69 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key69;
       public            Sistema JD_owner    false    219            �           2606    1319742    cliente cliente_rut_key7 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key7 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key7;
       public            Sistema JD_owner    false    219            �           2606    1319688    cliente cliente_rut_key70 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key70 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key70;
       public            Sistema JD_owner    false    219            �           2606    1319868    cliente cliente_rut_key71 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key71 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key71;
       public            Sistema JD_owner    false    219            �           2606    1319686    cliente cliente_rut_key72 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key72 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key72;
       public            Sistema JD_owner    false    219            �           2606    1319732    cliente cliente_rut_key73 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key73 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key73;
       public            Sistema JD_owner    false    219                       2606    1319682    cliente cliente_rut_key74 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key74 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key74;
       public            Sistema JD_owner    false    219                       2606    1319818    cliente cliente_rut_key75 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key75 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key75;
       public            Sistema JD_owner    false    219                       2606    1319680    cliente cliente_rut_key76 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key76 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key76;
       public            Sistema JD_owner    false    219                       2606    1319816    cliente cliente_rut_key77 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key77 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key77;
       public            Sistema JD_owner    false    219            	           2606    1319676    cliente cliente_rut_key78 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key78 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key78;
       public            Sistema JD_owner    false    219                       2606    1319728    cliente cliente_rut_key79 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key79 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key79;
       public            Sistema JD_owner    false    219                       2606    1319740    cliente cliente_rut_key8 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key8 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key8;
       public            Sistema JD_owner    false    219                       2606    1319674    cliente cliente_rut_key80 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key80 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key80;
       public            Sistema JD_owner    false    219                       2606    1319790    cliente cliente_rut_key81 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key81 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key81;
       public            Sistema JD_owner    false    219                       2606    1319672    cliente cliente_rut_key82 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key82 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key82;
       public            Sistema JD_owner    false    219                       2606    1319774    cliente cliente_rut_key83 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key83 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key83;
       public            Sistema JD_owner    false    219                       2606    1319670    cliente cliente_rut_key84 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key84 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key84;
       public            Sistema JD_owner    false    219                       2606    1319744    cliente cliente_rut_key85 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key85 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key85;
       public            Sistema JD_owner    false    219                       2606    1319668    cliente cliente_rut_key86 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key86 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key86;
       public            Sistema JD_owner    false    219                       2606    1319914    cliente cliente_rut_key87 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key87 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key87;
       public            Sistema JD_owner    false    219                       2606    1319666    cliente cliente_rut_key88 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key88 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key88;
       public            Sistema JD_owner    false    219            !           2606    1319678    cliente cliente_rut_key89 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key89 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key89;
       public            Sistema JD_owner    false    219            #           2606    1319858    cliente cliente_rut_key9 
   CONSTRAINT     R   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key9 UNIQUE (rut);
 B   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key9;
       public            Sistema JD_owner    false    219            %           2606    1319784    cliente cliente_rut_key90 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key90 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key90;
       public            Sistema JD_owner    false    219            '           2606    1319664    cliente cliente_rut_key91 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key91 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key91;
       public            Sistema JD_owner    false    219            )           2606    1319662    cliente cliente_rut_key92 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key92 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key92;
       public            Sistema JD_owner    false    219            +           2606    1319602    cliente cliente_rut_key93 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key93 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key93;
       public            Sistema JD_owner    false    219            -           2606    1319660    cliente cliente_rut_key94 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key94 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key94;
       public            Sistema JD_owner    false    219            /           2606    1319576    cliente cliente_rut_key95 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key95 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key95;
       public            Sistema JD_owner    false    219            1           2606    1319604    cliente cliente_rut_key96 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key96 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key96;
       public            Sistema JD_owner    false    219            3           2606    1319658    cliente cliente_rut_key97 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key97 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key97;
       public            Sistema JD_owner    false    219            5           2606    1319656    cliente cliente_rut_key98 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key98 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key98;
       public            Sistema JD_owner    false    219            7           2606    1319922    cliente cliente_rut_key99 
   CONSTRAINT     S   ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_rut_key99 UNIQUE (rut);
 C   ALTER TABLE ONLY public.cliente DROP CONSTRAINT cliente_rut_key99;
       public            Sistema JD_owner    false    219            ?           2606    229407 *   contacto_comercial contacto_comercial_pkey 
   CONSTRAINT     {   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT contacto_comercial_pkey PRIMARY KEY (id_contacto_comercial);
 T   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT contacto_comercial_pkey;
       public            Sistema JD_owner    false    226            �           2606    1032240 "   control_tiempo control_tiempo_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.control_tiempo
    ADD CONSTRAINT control_tiempo_pkey PRIMARY KEY (id_control_tiempo);
 L   ALTER TABLE ONLY public.control_tiempo DROP CONSTRAINT control_tiempo_pkey;
       public            Sistema JD_owner    false    241            =           2606    229393 ,   informacion_de_pago informacion_de_pago_pkey 
   CONSTRAINT     v   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT informacion_de_pago_pkey PRIMARY KEY (id_informacion);
 V   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT informacion_de_pago_pkey;
       public            Sistema JD_owner    false    224            �           2606    1032223 $   informe_trabajo informe_trabajo_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.informe_trabajo
    ADD CONSTRAINT informe_trabajo_pkey PRIMARY KEY (id_it);
 N   ALTER TABLE ONLY public.informe_trabajo DROP CONSTRAINT informe_trabajo_pkey;
       public            Sistema JD_owner    false    239            C           2606    1320396    insumo insumo_NOMBRE_INSUMO_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key" UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key";
       public            Sistema JD_owner    false    230            E           2606    1320472     insumo insumo_NOMBRE_INSUMO_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key1" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key1";
       public            Sistema JD_owner    false    230            G           2606    1320450 !   insumo insumo_NOMBRE_INSUMO_key10 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key10" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key10";
       public            Sistema JD_owner    false    230            I           2606    1320310 !   insumo insumo_NOMBRE_INSUMO_key11 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key11" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key11";
       public            Sistema JD_owner    false    230            K           2606    1320452 !   insumo insumo_NOMBRE_INSUMO_key12 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key12" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key12";
       public            Sistema JD_owner    false    230            M           2606    1320432 !   insumo insumo_NOMBRE_INSUMO_key13 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key13" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key13";
       public            Sistema JD_owner    false    230            O           2606    1320430 !   insumo insumo_NOMBRE_INSUMO_key14 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key14" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key14";
       public            Sistema JD_owner    false    230            Q           2606    1320454 !   insumo insumo_NOMBRE_INSUMO_key15 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key15" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key15";
       public            Sistema JD_owner    false    230            S           2606    1320458 !   insumo insumo_NOMBRE_INSUMO_key16 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key16" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key16";
       public            Sistema JD_owner    false    230            U           2606    1320272 !   insumo insumo_NOMBRE_INSUMO_key17 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key17" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key17";
       public            Sistema JD_owner    false    230            W           2606    1320460 !   insumo insumo_NOMBRE_INSUMO_key18 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key18" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key18";
       public            Sistema JD_owner    false    230            Y           2606    1320108 !   insumo insumo_NOMBRE_INSUMO_key19 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key19" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key19";
       public            Sistema JD_owner    false    230            [           2606    1320156     insumo insumo_NOMBRE_INSUMO_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key2" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key2";
       public            Sistema JD_owner    false    230            ]           2606    1320208 !   insumo insumo_NOMBRE_INSUMO_key20 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key20" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key20";
       public            Sistema JD_owner    false    230            _           2606    1320394 !   insumo insumo_NOMBRE_INSUMO_key21 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key21" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key21";
       public            Sistema JD_owner    false    230            a           2606    1320216 !   insumo insumo_NOMBRE_INSUMO_key22 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key22" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key22";
       public            Sistema JD_owner    false    230            c           2606    1320438 !   insumo insumo_NOMBRE_INSUMO_key23 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key23" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key23";
       public            Sistema JD_owner    false    230            e           2606    1320252 !   insumo insumo_NOMBRE_INSUMO_key24 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key24" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key24";
       public            Sistema JD_owner    false    230            g           2606    1320278 !   insumo insumo_NOMBRE_INSUMO_key25 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key25" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key25";
       public            Sistema JD_owner    false    230            i           2606    1320128 !   insumo insumo_NOMBRE_INSUMO_key26 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key26" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key26";
       public            Sistema JD_owner    false    230            k           2606    1320242 !   insumo insumo_NOMBRE_INSUMO_key27 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key27" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key27";
       public            Sistema JD_owner    false    230            m           2606    1320132 !   insumo insumo_NOMBRE_INSUMO_key28 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key28" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key28";
       public            Sistema JD_owner    false    230            o           2606    1320238 !   insumo insumo_NOMBRE_INSUMO_key29 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key29" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key29";
       public            Sistema JD_owner    false    230            q           2606    1320468     insumo insumo_NOMBRE_INSUMO_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key3" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key3";
       public            Sistema JD_owner    false    230            s           2606    1320220 !   insumo insumo_NOMBRE_INSUMO_key30 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key30" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key30";
       public            Sistema JD_owner    false    230            u           2606    1320434 !   insumo insumo_NOMBRE_INSUMO_key31 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key31" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key31";
       public            Sistema JD_owner    false    230            w           2606    1320436 !   insumo insumo_NOMBRE_INSUMO_key32 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key32" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key32";
       public            Sistema JD_owner    false    230            y           2606    1320276 !   insumo insumo_NOMBRE_INSUMO_key33 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key33" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key33";
       public            Sistema JD_owner    false    230            {           2606    1320162 !   insumo insumo_NOMBRE_INSUMO_key34 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key34" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key34";
       public            Sistema JD_owner    false    230            }           2606    1320106 !   insumo insumo_NOMBRE_INSUMO_key35 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key35" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key35";
       public            Sistema JD_owner    false    230                       2606    1320212 !   insumo insumo_NOMBRE_INSUMO_key36 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key36" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key36";
       public            Sistema JD_owner    false    230            �           2606    1320376 !   insumo insumo_NOMBRE_INSUMO_key37 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key37" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key37";
       public            Sistema JD_owner    false    230            �           2606    1320402 !   insumo insumo_NOMBRE_INSUMO_key38 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key38" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key38";
       public            Sistema JD_owner    false    230            �           2606    1320142 !   insumo insumo_NOMBRE_INSUMO_key39 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key39" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key39";
       public            Sistema JD_owner    false    230            �           2606    1320158     insumo insumo_NOMBRE_INSUMO_key4 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key4" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key4";
       public            Sistema JD_owner    false    230            �           2606    1320224 !   insumo insumo_NOMBRE_INSUMO_key40 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key40" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key40";
       public            Sistema JD_owner    false    230            �           2606    1320140 !   insumo insumo_NOMBRE_INSUMO_key41 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key41" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key41";
       public            Sistema JD_owner    false    230            �           2606    1320226 !   insumo insumo_NOMBRE_INSUMO_key42 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key42" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key42";
       public            Sistema JD_owner    false    230            �           2606    1320304 !   insumo insumo_NOMBRE_INSUMO_key43 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key43" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key43";
       public            Sistema JD_owner    false    230            �           2606    1320266 !   insumo insumo_NOMBRE_INSUMO_key44 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key44" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key44";
       public            Sistema JD_owner    false    230            �           2606    1320270 !   insumo insumo_NOMBRE_INSUMO_key45 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key45" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key45";
       public            Sistema JD_owner    false    230            �           2606    1320268 !   insumo insumo_NOMBRE_INSUMO_key46 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key46" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key46";
       public            Sistema JD_owner    false    230            �           2606    1320240 !   insumo insumo_NOMBRE_INSUMO_key47 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key47" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key47";
       public            Sistema JD_owner    false    230            �           2606    1320462 !   insumo insumo_NOMBRE_INSUMO_key48 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key48" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key48";
       public            Sistema JD_owner    false    230            �           2606    1320126 !   insumo insumo_NOMBRE_INSUMO_key49 
   CONSTRAINT     g   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key49" UNIQUE (nombre_insumo);
 M   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key49";
       public            Sistema JD_owner    false    230            �           2606    1320464     insumo insumo_NOMBRE_INSUMO_key5 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key5" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key5";
       public            Sistema JD_owner    false    230            �           2606    1320160     insumo insumo_NOMBRE_INSUMO_key6 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key6" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key6";
       public            Sistema JD_owner    false    230            �           2606    1320274     insumo insumo_NOMBRE_INSUMO_key7 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key7" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key7";
       public            Sistema JD_owner    false    230            �           2606    1320170     insumo insumo_NOMBRE_INSUMO_key8 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key8" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key8";
       public            Sistema JD_owner    false    230            �           2606    1320312     insumo insumo_NOMBRE_INSUMO_key9 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT "insumo_NOMBRE_INSUMO_key9" UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT "insumo_NOMBRE_INSUMO_key9";
       public            Sistema JD_owner    false    230            �           2606    1320124    insumo insumo_nombre_insumo_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key UNIQUE (nombre_insumo);
 I   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key;
       public            Sistema JD_owner    false    230            �           2606    1320122     insumo insumo_nombre_insumo_key1 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key1 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key1;
       public            Sistema JD_owner    false    230            �           2606    1320422 !   insumo insumo_nombre_insumo_key10 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key10 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key10;
       public            Sistema JD_owner    false    230            �           2606    1320296 "   insumo insumo_nombre_insumo_key100 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key100 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key100;
       public            Sistema JD_owner    false    230            �           2606    1320294 "   insumo insumo_nombre_insumo_key101 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key101 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key101;
       public            Sistema JD_owner    false    230            �           2606    1320280 "   insumo insumo_nombre_insumo_key102 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key102 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key102;
       public            Sistema JD_owner    false    230            �           2606    1320130 "   insumo insumo_nombre_insumo_key103 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key103 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key103;
       public            Sistema JD_owner    false    230            �           2606    1320282 "   insumo insumo_nombre_insumo_key104 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key104 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key104;
       public            Sistema JD_owner    false    230            �           2606    1320290 "   insumo insumo_nombre_insumo_key105 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key105 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key105;
       public            Sistema JD_owner    false    230            �           2606    1320284 "   insumo insumo_nombre_insumo_key106 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key106 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key106;
       public            Sistema JD_owner    false    230            �           2606    1320288 "   insumo insumo_nombre_insumo_key107 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key107 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key107;
       public            Sistema JD_owner    false    230            �           2606    1320286 "   insumo insumo_nombre_insumo_key108 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key108 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key108;
       public            Sistema JD_owner    false    230            �           2606    1320200 "   insumo insumo_nombre_insumo_key109 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key109 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key109;
       public            Sistema JD_owner    false    230            �           2606    1320330 !   insumo insumo_nombre_insumo_key11 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key11 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key11;
       public            Sistema JD_owner    false    230            �           2606    1320428 "   insumo insumo_nombre_insumo_key110 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key110 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key110;
       public            Sistema JD_owner    false    230            �           2606    1320392 "   insumo insumo_nombre_insumo_key111 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key111 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key111;
       public            Sistema JD_owner    false    230            �           2606    1320412 "   insumo insumo_nombre_insumo_key112 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key112 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key112;
       public            Sistema JD_owner    false    230            �           2606    1320442 "   insumo insumo_nombre_insumo_key113 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key113 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key113;
       public            Sistema JD_owner    false    230            �           2606    1320440 "   insumo insumo_nombre_insumo_key114 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key114 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key114;
       public            Sistema JD_owner    false    230            �           2606    1320338 "   insumo insumo_nombre_insumo_key115 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key115 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key115;
       public            Sistema JD_owner    false    230            �           2606    1320424 "   insumo insumo_nombre_insumo_key116 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key116 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key116;
       public            Sistema JD_owner    false    230            �           2606    1320364 "   insumo insumo_nombre_insumo_key117 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key117 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key117;
       public            Sistema JD_owner    false    230            �           2606    1320362 "   insumo insumo_nombre_insumo_key118 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key118 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key118;
       public            Sistema JD_owner    false    230            �           2606    1320340 "   insumo insumo_nombre_insumo_key119 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key119 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key119;
       public            Sistema JD_owner    false    230            �           2606    1320420 !   insumo insumo_nombre_insumo_key12 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key12 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key12;
       public            Sistema JD_owner    false    230            �           2606    1320360 "   insumo insumo_nombre_insumo_key120 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key120 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key120;
       public            Sistema JD_owner    false    230            �           2606    1320344 "   insumo insumo_nombre_insumo_key121 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key121 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key121;
       public            Sistema JD_owner    false    230            �           2606    1320358 "   insumo insumo_nombre_insumo_key122 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key122 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key122;
       public            Sistema JD_owner    false    230            �           2606    1320346 "   insumo insumo_nombre_insumo_key123 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key123 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key123;
       public            Sistema JD_owner    false    230            �           2606    1320356 "   insumo insumo_nombre_insumo_key124 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key124 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key124;
       public            Sistema JD_owner    false    230            �           2606    1320348 "   insumo insumo_nombre_insumo_key125 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key125 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key125;
       public            Sistema JD_owner    false    230            �           2606    1320354 "   insumo insumo_nombre_insumo_key126 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key126 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key126;
       public            Sistema JD_owner    false    230            �           2606    1320292 "   insumo insumo_nombre_insumo_key127 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key127 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key127;
       public            Sistema JD_owner    false    230            �           2606    1320350 "   insumo insumo_nombre_insumo_key128 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key128 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key128;
       public            Sistema JD_owner    false    230            �           2606    1320222 "   insumo insumo_nombre_insumo_key129 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key129 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key129;
       public            Sistema JD_owner    false    230            �           2606    1320332 !   insumo insumo_nombre_insumo_key13 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key13 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key13;
       public            Sistema JD_owner    false    230            �           2606    1320218 "   insumo insumo_nombre_insumo_key130 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key130 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key130;
       public            Sistema JD_owner    false    230            �           2606    1320214 "   insumo insumo_nombre_insumo_key131 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key131 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key131;
       public            Sistema JD_owner    false    230            �           2606    1320254 "   insumo insumo_nombre_insumo_key132 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key132 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key132;
       public            Sistema JD_owner    false    230            �           2606    1320206 "   insumo insumo_nombre_insumo_key133 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key133 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key133;
       public            Sistema JD_owner    false    230            �           2606    1320456 "   insumo insumo_nombre_insumo_key134 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key134 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key134;
       public            Sistema JD_owner    false    230            �           2606    1320116 "   insumo insumo_nombre_insumo_key135 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key135 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key135;
       public            Sistema JD_owner    false    230            �           2606    1320256 "   insumo insumo_nombre_insumo_key136 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key136 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key136;
       public            Sistema JD_owner    false    230            �           2606    1320264 "   insumo insumo_nombre_insumo_key137 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key137 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key137;
       public            Sistema JD_owner    false    230            �           2606    1320258 "   insumo insumo_nombre_insumo_key138 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key138 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key138;
       public            Sistema JD_owner    false    230                       2606    1320342 "   insumo insumo_nombre_insumo_key139 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key139 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key139;
       public            Sistema JD_owner    false    230                       2606    1320418 !   insumo insumo_nombre_insumo_key14 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key14 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key14;
       public            Sistema JD_owner    false    230                       2606    1320352 "   insumo insumo_nombre_insumo_key140 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key140 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key140;
       public            Sistema JD_owner    false    230                       2606    1320120 "   insumo insumo_nombre_insumo_key141 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key141 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key141;
       public            Sistema JD_owner    false    230            	           2606    1320088 "   insumo insumo_nombre_insumo_key142 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key142 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key142;
       public            Sistema JD_owner    false    230                       2606    1320474 "   insumo insumo_nombre_insumo_key143 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key143 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key143;
       public            Sistema JD_owner    false    230                       2606    1320476 "   insumo insumo_nombre_insumo_key144 
   CONSTRAINT     f   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key144 UNIQUE (nombre_insumo);
 L   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key144;
       public            Sistema JD_owner    false    230                       2606    1320164 !   insumo insumo_nombre_insumo_key15 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key15 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key15;
       public            Sistema JD_owner    false    230                       2606    1320372 !   insumo insumo_nombre_insumo_key16 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key16 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key16;
       public            Sistema JD_owner    false    230                       2606    1320416 !   insumo insumo_nombre_insumo_key17 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key17 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key17;
       public            Sistema JD_owner    false    230                       2606    1320444 !   insumo insumo_nombre_insumo_key18 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key18 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key18;
       public            Sistema JD_owner    false    230                       2606    1320446 !   insumo insumo_nombre_insumo_key19 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key19 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key19;
       public            Sistema JD_owner    false    230                       2606    1320174     insumo insumo_nombre_insumo_key2 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key2 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key2;
       public            Sistema JD_owner    false    230                       2606    1320410 !   insumo insumo_nombre_insumo_key20 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key20 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key20;
       public            Sistema JD_owner    false    230                       2606    1320448 !   insumo insumo_nombre_insumo_key21 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key21 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key21;
       public            Sistema JD_owner    false    230                       2606    1320390 !   insumo insumo_nombre_insumo_key22 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key22 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key22;
       public            Sistema JD_owner    false    230            !           2606    1320320 !   insumo insumo_nombre_insumo_key23 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key23 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key23;
       public            Sistema JD_owner    false    230            #           2606    1320388 !   insumo insumo_nombre_insumo_key24 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key24 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key24;
       public            Sistema JD_owner    false    230            %           2606    1320374 !   insumo insumo_nombre_insumo_key25 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key25 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key25;
       public            Sistema JD_owner    false    230            '           2606    1320386 !   insumo insumo_nombre_insumo_key26 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key26 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key26;
       public            Sistema JD_owner    false    230            )           2606    1320204 !   insumo insumo_nombre_insumo_key27 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key27 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key27;
       public            Sistema JD_owner    false    230            +           2606    1320384 !   insumo insumo_nombre_insumo_key28 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key28 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key28;
       public            Sistema JD_owner    false    230            -           2606    1320168 !   insumo insumo_nombre_insumo_key29 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key29 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key29;
       public            Sistema JD_owner    false    230            /           2606    1320202     insumo insumo_nombre_insumo_key3 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key3 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key3;
       public            Sistema JD_owner    false    230            1           2606    1320382 !   insumo insumo_nombre_insumo_key30 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key30 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key30;
       public            Sistema JD_owner    false    230            3           2606    1320182 !   insumo insumo_nombre_insumo_key31 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key31 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key31;
       public            Sistema JD_owner    false    230            5           2606    1320324 !   insumo insumo_nombre_insumo_key32 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key32 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key32;
       public            Sistema JD_owner    false    230            7           2606    1320466 !   insumo insumo_nombre_insumo_key33 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key33 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key33;
       public            Sistema JD_owner    false    230            9           2606    1320136 !   insumo insumo_nombre_insumo_key34 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key34 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key34;
       public            Sistema JD_owner    false    230            ;           2606    1320322 !   insumo insumo_nombre_insumo_key35 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key35 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key35;
       public            Sistema JD_owner    false    230            =           2606    1320398 !   insumo insumo_nombre_insumo_key36 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key36 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key36;
       public            Sistema JD_owner    false    230            ?           2606    1320172 !   insumo insumo_nombre_insumo_key37 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key37 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key37;
       public            Sistema JD_owner    false    230            A           2606    1320092 !   insumo insumo_nombre_insumo_key38 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key38 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key38;
       public            Sistema JD_owner    false    230            C           2606    1320406 !   insumo insumo_nombre_insumo_key39 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key39 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key39;
       public            Sistema JD_owner    false    230            E           2606    1320176     insumo insumo_nombre_insumo_key4 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key4 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key4;
       public            Sistema JD_owner    false    230            G           2606    1320210 !   insumo insumo_nombre_insumo_key40 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key40 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key40;
       public            Sistema JD_owner    false    230            I           2606    1320408 !   insumo insumo_nombre_insumo_key41 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key41 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key41;
       public            Sistema JD_owner    false    230            K           2606    1320306 !   insumo insumo_nombre_insumo_key42 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key42 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key42;
       public            Sistema JD_owner    false    230            M           2606    1320150 !   insumo insumo_nombre_insumo_key43 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key43 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key43;
       public            Sistema JD_owner    false    230            O           2606    1320096 !   insumo insumo_nombre_insumo_key44 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key44 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key44;
       public            Sistema JD_owner    false    230            Q           2606    1320380 !   insumo insumo_nombre_insumo_key45 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key45 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key45;
       public            Sistema JD_owner    false    230            S           2606    1320146 !   insumo insumo_nombre_insumo_key46 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key46 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key46;
       public            Sistema JD_owner    false    230            U           2606    1320248 !   insumo insumo_nombre_insumo_key47 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key47 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key47;
       public            Sistema JD_owner    false    230            W           2606    1320378 !   insumo insumo_nombre_insumo_key48 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key48 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key48;
       public            Sistema JD_owner    false    230            Y           2606    1320144 !   insumo insumo_nombre_insumo_key49 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key49 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key49;
       public            Sistema JD_owner    false    230            [           2606    1320138     insumo insumo_nombre_insumo_key5 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key5 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key5;
       public            Sistema JD_owner    false    230            ]           2606    1320098 !   insumo insumo_nombre_insumo_key50 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key50 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key50;
       public            Sistema JD_owner    false    230            _           2606    1320318 !   insumo insumo_nombre_insumo_key51 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key51 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key51;
       public            Sistema JD_owner    false    230            a           2606    1320316 !   insumo insumo_nombre_insumo_key52 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key52 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key52;
       public            Sistema JD_owner    false    230            c           2606    1320102 !   insumo insumo_nombre_insumo_key53 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key53 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key53;
       public            Sistema JD_owner    false    230            e           2606    1320302 !   insumo insumo_nombre_insumo_key54 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key54 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key54;
       public            Sistema JD_owner    false    230            g           2606    1320112 !   insumo insumo_nombre_insumo_key55 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key55 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key55;
       public            Sistema JD_owner    false    230            i           2606    1320300 !   insumo insumo_nombre_insumo_key56 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key56 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key56;
       public            Sistema JD_owner    false    230            k           2606    1320298 !   insumo insumo_nombre_insumo_key57 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key57 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key57;
       public            Sistema JD_owner    false    230            m           2606    1320260 !   insumo insumo_nombre_insumo_key58 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key58 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key58;
       public            Sistema JD_owner    false    230            o           2606    1320192 !   insumo insumo_nombre_insumo_key59 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key59 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key59;
       public            Sistema JD_owner    false    230            q           2606    1320308     insumo insumo_nombre_insumo_key6 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key6 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key6;
       public            Sistema JD_owner    false    230            s           2606    1320166 !   insumo insumo_nombre_insumo_key60 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key60 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key60;
       public            Sistema JD_owner    false    230            u           2606    1320190 !   insumo insumo_nombre_insumo_key61 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key61 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key61;
       public            Sistema JD_owner    false    230            w           2606    1320114 !   insumo insumo_nombre_insumo_key62 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key62 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key62;
       public            Sistema JD_owner    false    230            y           2606    1320188 !   insumo insumo_nombre_insumo_key63 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key63 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key63;
       public            Sistema JD_owner    false    230            {           2606    1320186 !   insumo insumo_nombre_insumo_key64 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key64 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key64;
       public            Sistema JD_owner    false    230            }           2606    1320228 !   insumo insumo_nombre_insumo_key65 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key65 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key65;
       public            Sistema JD_owner    false    230                       2606    1320184 !   insumo insumo_nombre_insumo_key66 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key66 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key66;
       public            Sistema JD_owner    false    230            �           2606    1320236 !   insumo insumo_nombre_insumo_key67 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key67 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key67;
       public            Sistema JD_owner    false    230            �           2606    1320194 !   insumo insumo_nombre_insumo_key68 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key68 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key68;
       public            Sistema JD_owner    false    230            �           2606    1320230 !   insumo insumo_nombre_insumo_key69 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key69 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key69;
       public            Sistema JD_owner    false    230            �           2606    1320426     insumo insumo_nombre_insumo_key7 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key7 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key7;
       public            Sistema JD_owner    false    230            �           2606    1320234 !   insumo insumo_nombre_insumo_key70 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key70 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key70;
       public            Sistema JD_owner    false    230            �           2606    1320336 !   insumo insumo_nombre_insumo_key71 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key71 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key71;
       public            Sistema JD_owner    false    230            �           2606    1320232 !   insumo insumo_nombre_insumo_key72 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key72 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key72;
       public            Sistema JD_owner    false    230            �           2606    1320400 !   insumo insumo_nombre_insumo_key73 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key73 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key73;
       public            Sistema JD_owner    false    230            �           2606    1320404 !   insumo insumo_nombre_insumo_key74 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key74 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key74;
       public            Sistema JD_owner    false    230            �           2606    1320152 !   insumo insumo_nombre_insumo_key75 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key75 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key75;
       public            Sistema JD_owner    false    230            �           2606    1320262 !   insumo insumo_nombre_insumo_key76 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key76 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key76;
       public            Sistema JD_owner    false    230            �           2606    1320148 !   insumo insumo_nombre_insumo_key77 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key77 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key77;
       public            Sistema JD_owner    false    230            �           2606    1320470 !   insumo insumo_nombre_insumo_key78 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key78 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key78;
       public            Sistema JD_owner    false    230            �           2606    1320250 !   insumo insumo_nombre_insumo_key79 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key79 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key79;
       public            Sistema JD_owner    false    230            �           2606    1320326     insumo insumo_nombre_insumo_key8 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key8 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key8;
       public            Sistema JD_owner    false    230            �           2606    1320314 !   insumo insumo_nombre_insumo_key80 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key80 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key80;
       public            Sistema JD_owner    false    230            �           2606    1320178 !   insumo insumo_nombre_insumo_key81 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key81 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key81;
       public            Sistema JD_owner    false    230            �           2606    1320244 !   insumo insumo_nombre_insumo_key82 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key82 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key82;
       public            Sistema JD_owner    false    230            �           2606    1320414 !   insumo insumo_nombre_insumo_key83 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key83 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key83;
       public            Sistema JD_owner    false    230            �           2606    1320198 !   insumo insumo_nombre_insumo_key84 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key84 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key84;
       public            Sistema JD_owner    false    230            �           2606    1320118 !   insumo insumo_nombre_insumo_key85 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key85 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key85;
       public            Sistema JD_owner    false    230            �           2606    1320196 !   insumo insumo_nombre_insumo_key86 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key86 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key86;
       public            Sistema JD_owner    false    230            �           2606    1320154 !   insumo insumo_nombre_insumo_key87 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key87 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key87;
       public            Sistema JD_owner    false    230            �           2606    1320100 !   insumo insumo_nombre_insumo_key88 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key88 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key88;
       public            Sistema JD_owner    false    230            �           2606    1320134 !   insumo insumo_nombre_insumo_key89 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key89 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key89;
       public            Sistema JD_owner    false    230            �           2606    1320328     insumo insumo_nombre_insumo_key9 
   CONSTRAINT     d   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key9 UNIQUE (nombre_insumo);
 J   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key9;
       public            Sistema JD_owner    false    230            �           2606    1320180 !   insumo insumo_nombre_insumo_key90 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key90 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key90;
       public            Sistema JD_owner    false    230            �           2606    1320090 !   insumo insumo_nombre_insumo_key91 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key91 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key91;
       public            Sistema JD_owner    false    230            �           2606    1320370 !   insumo insumo_nombre_insumo_key92 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key92 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key92;
       public            Sistema JD_owner    false    230            �           2606    1320334 !   insumo insumo_nombre_insumo_key93 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key93 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key93;
       public            Sistema JD_owner    false    230            �           2606    1320368 !   insumo insumo_nombre_insumo_key94 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key94 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key94;
       public            Sistema JD_owner    false    230            �           2606    1320246 !   insumo insumo_nombre_insumo_key95 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key95 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key95;
       public            Sistema JD_owner    false    230            �           2606    1320366 !   insumo insumo_nombre_insumo_key96 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key96 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key96;
       public            Sistema JD_owner    false    230            �           2606    1320110 !   insumo insumo_nombre_insumo_key97 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key97 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key97;
       public            Sistema JD_owner    false    230            �           2606    1320094 !   insumo insumo_nombre_insumo_key98 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key98 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key98;
       public            Sistema JD_owner    false    230            �           2606    1320104 !   insumo insumo_nombre_insumo_key99 
   CONSTRAINT     e   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_nombre_insumo_key99 UNIQUE (nombre_insumo);
 K   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_nombre_insumo_key99;
       public            Sistema JD_owner    false    230            �           2606    377406    insumo insumo_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_pkey PRIMARY KEY (id_insumo);
 <   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_pkey;
       public            Sistema JD_owner    false    230            �           2606    1320538 "   maquinas maquinas_numero_motor_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_numero_motor_key UNIQUE (numero_motor);
 L   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_numero_motor_key;
       public            Sistema JD_owner    false    243            �           2606    1320540 #   maquinas maquinas_numero_motor_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_numero_motor_key1 UNIQUE (numero_motor);
 M   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_numero_motor_key1;
       public            Sistema JD_owner    false    243            �           2606    1320536 #   maquinas maquinas_numero_motor_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_numero_motor_key2 UNIQUE (numero_motor);
 M   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_numero_motor_key2;
       public            Sistema JD_owner    false    243            �           2606    1320530 "   maquinas maquinas_numero_serie_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_numero_serie_key UNIQUE (numero_serie);
 L   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_numero_serie_key;
       public            Sistema JD_owner    false    243            �           2606    1320532 #   maquinas maquinas_numero_serie_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_numero_serie_key1 UNIQUE (numero_serie);
 M   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_numero_serie_key1;
       public            Sistema JD_owner    false    243            �           2606    1320528 #   maquinas maquinas_numero_serie_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_numero_serie_key2 UNIQUE (numero_serie);
 M   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_numero_serie_key2;
       public            Sistema JD_owner    false    243            �           2606    1302549    maquinas maquinas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_pkey PRIMARY KEY (id_maquina);
 @   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_pkey;
       public            Sistema JD_owner    false    243            9           2606    90501    metodos_pago metodos_pago_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.metodos_pago
    ADD CONSTRAINT metodos_pago_pkey PRIMARY KEY (id_metodo_pago);
 H   ALTER TABLE ONLY public.metodos_pago DROP CONSTRAINT metodos_pago_pkey;
       public            Sistema JD_owner    false    221            �           2606    565284    ot_insumo ot_insumo_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.ot_insumo
    ADD CONSTRAINT ot_insumo_pkey PRIMARY KEY (id_ot, id_insumo);
 B   ALTER TABLE ONLY public.ot_insumo DROP CONSTRAINT ot_insumo_pkey;
       public            Sistema JD_owner    false    233    233            �           2606    565274 
   ot ot_pkey 
   CONSTRAINT     K   ALTER TABLE ONLY public.ot
    ADD CONSTRAINT ot_pkey PRIMARY KEY (id_ot);
 4   ALTER TABLE ONLY public.ot DROP CONSTRAINT ot_pkey;
       public            Sistema JD_owner    false    232            �           2606    673630    productos productos_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id_producto);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            Sistema JD_owner    false    237            �           2606    1319504    rol rol_NOMBRE_ROL_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "rol_NOMBRE_ROL_key" UNIQUE (nombre_rol);
 B   ALTER TABLE ONLY public.rol DROP CONSTRAINT "rol_NOMBRE_ROL_key";
       public            Sistema JD_owner    false    216            �           2606    57385    rol rol_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            Sistema JD_owner    false    216            �           2606    1319361 !   usuario usuario_email_usuario_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key UNIQUE (email_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key;
       public            Sistema JD_owner    false    217            �           2606    1319355 "   usuario usuario_email_usuario_key1 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key1 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key1;
       public            Sistema JD_owner    false    217            �           2606    1319345 #   usuario usuario_email_usuario_key10 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key10 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key10;
       public            Sistema JD_owner    false    217            �           2606    1319249 $   usuario usuario_email_usuario_key100 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key100 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key100;
       public            Sistema JD_owner    false    217            �           2606    1319465 $   usuario usuario_email_usuario_key101 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key101 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key101;
       public            Sistema JD_owner    false    217            �           2606    1319467 $   usuario usuario_email_usuario_key102 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key102 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key102;
       public            Sistema JD_owner    false    217            �           2606    1319247 $   usuario usuario_email_usuario_key103 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key103 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key103;
       public            Sistema JD_owner    false    217            �           2606    1319413 $   usuario usuario_email_usuario_key104 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key104 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key104;
       public            Sistema JD_owner    false    217            �           2606    1319245 $   usuario usuario_email_usuario_key105 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key105 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key105;
       public            Sistema JD_owner    false    217            �           2606    1319469 $   usuario usuario_email_usuario_key106 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key106 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key106;
       public            Sistema JD_owner    false    217            �           2606    1319243 $   usuario usuario_email_usuario_key107 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key107 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key107;
       public            Sistema JD_owner    false    217            �           2606    1319471 $   usuario usuario_email_usuario_key108 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key108 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key108;
       public            Sistema JD_owner    false    217            �           2606    1319241 $   usuario usuario_email_usuario_key109 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key109 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key109;
       public            Sistema JD_owner    false    217            �           2606    1319381 #   usuario usuario_email_usuario_key11 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key11 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key11;
       public            Sistema JD_owner    false    217            �           2606    1319409 $   usuario usuario_email_usuario_key110 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key110 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key110;
       public            Sistema JD_owner    false    217            �           2606    1319239 $   usuario usuario_email_usuario_key111 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key111 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key111;
       public            Sistema JD_owner    false    217            �           2606    1319401 $   usuario usuario_email_usuario_key112 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key112 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key112;
       public            Sistema JD_owner    false    217            �           2606    1319237 $   usuario usuario_email_usuario_key113 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key113 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key113;
       public            Sistema JD_owner    false    217            �           2606    1319459 $   usuario usuario_email_usuario_key114 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key114 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key114;
       public            Sistema JD_owner    false    217            �           2606    1319423 $   usuario usuario_email_usuario_key115 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key115 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key115;
       public            Sistema JD_owner    false    217            �           2606    1319235 $   usuario usuario_email_usuario_key116 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key116 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key116;
       public            Sistema JD_owner    false    217            �           2606    1319473 $   usuario usuario_email_usuario_key117 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key117 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key117;
       public            Sistema JD_owner    false    217            �           2606    1319233 $   usuario usuario_email_usuario_key118 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key118 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key118;
       public            Sistema JD_owner    false    217            �           2606    1319475 $   usuario usuario_email_usuario_key119 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key119 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key119;
       public            Sistema JD_owner    false    217            �           2606    1319343 #   usuario usuario_email_usuario_key12 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key12 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key12;
       public            Sistema JD_owner    false    217            �           2606    1319231 $   usuario usuario_email_usuario_key120 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key120 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key120;
       public            Sistema JD_owner    false    217            �           2606    1319477 $   usuario usuario_email_usuario_key121 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key121 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key121;
       public            Sistema JD_owner    false    217            �           2606    1319229 $   usuario usuario_email_usuario_key122 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key122 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key122;
       public            Sistema JD_owner    false    217            �           2606    1319479 $   usuario usuario_email_usuario_key123 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key123 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key123;
       public            Sistema JD_owner    false    217                       2606    1319227 $   usuario usuario_email_usuario_key124 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key124 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key124;
       public            Sistema JD_owner    false    217                       2606    1319481 $   usuario usuario_email_usuario_key125 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key125 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key125;
       public            Sistema JD_owner    false    217                       2606    1319225 $   usuario usuario_email_usuario_key126 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key126 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key126;
       public            Sistema JD_owner    false    217                       2606    1319483 $   usuario usuario_email_usuario_key127 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key127 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key127;
       public            Sistema JD_owner    false    217            	           2606    1319223 $   usuario usuario_email_usuario_key128 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key128 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key128;
       public            Sistema JD_owner    false    217                       2606    1319485 $   usuario usuario_email_usuario_key129 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key129 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key129;
       public            Sistema JD_owner    false    217                       2606    1319383 #   usuario usuario_email_usuario_key13 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key13 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key13;
       public            Sistema JD_owner    false    217                       2606    1319221 $   usuario usuario_email_usuario_key130 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key130 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key130;
       public            Sistema JD_owner    false    217                       2606    1319487 $   usuario usuario_email_usuario_key131 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key131 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key131;
       public            Sistema JD_owner    false    217                       2606    1319283 $   usuario usuario_email_usuario_key132 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key132 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key132;
       public            Sistema JD_owner    false    217                       2606    1319219 $   usuario usuario_email_usuario_key133 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key133 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key133;
       public            Sistema JD_owner    false    217                       2606    1319489 $   usuario usuario_email_usuario_key134 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key134 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key134;
       public            Sistema JD_owner    false    217                       2606    1319217 $   usuario usuario_email_usuario_key135 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key135 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key135;
       public            Sistema JD_owner    false    217                       2606    1319491 $   usuario usuario_email_usuario_key136 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key136 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key136;
       public            Sistema JD_owner    false    217                       2606    1319215 $   usuario usuario_email_usuario_key137 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key137 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key137;
       public            Sistema JD_owner    false    217                       2606    1319493 $   usuario usuario_email_usuario_key138 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key138 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key138;
       public            Sistema JD_owner    false    217            !           2606    1319213 $   usuario usuario_email_usuario_key139 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key139 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key139;
       public            Sistema JD_owner    false    217            #           2606    1319341 #   usuario usuario_email_usuario_key14 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key14 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key14;
       public            Sistema JD_owner    false    217            %           2606    1319359 $   usuario usuario_email_usuario_key140 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key140 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key140;
       public            Sistema JD_owner    false    217            '           2606    1319211 $   usuario usuario_email_usuario_key141 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key141 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key141;
       public            Sistema JD_owner    false    217            )           2606    1319495 $   usuario usuario_email_usuario_key142 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key142 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key142;
       public            Sistema JD_owner    false    217            +           2606    1319209 $   usuario usuario_email_usuario_key143 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key143 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key143;
       public            Sistema JD_owner    false    217            -           2606    1319207 $   usuario usuario_email_usuario_key144 
   CONSTRAINT     h   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key144 UNIQUE (email_usuario);
 N   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key144;
       public            Sistema JD_owner    false    217            /           2606    1319387 #   usuario usuario_email_usuario_key15 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key15 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key15;
       public            Sistema JD_owner    false    217            1           2606    1319391 #   usuario usuario_email_usuario_key16 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key16 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key16;
       public            Sistema JD_owner    false    217            3           2606    1319339 #   usuario usuario_email_usuario_key17 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key17 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key17;
       public            Sistema JD_owner    false    217            5           2606    1319393 #   usuario usuario_email_usuario_key18 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key18 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key18;
       public            Sistema JD_owner    false    217            7           2606    1319395 #   usuario usuario_email_usuario_key19 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key19 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key19;
       public            Sistema JD_owner    false    217            9           2606    1319365 "   usuario usuario_email_usuario_key2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key2 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key2;
       public            Sistema JD_owner    false    217            ;           2606    1319337 #   usuario usuario_email_usuario_key20 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key20 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key20;
       public            Sistema JD_owner    false    217            =           2606    1319399 #   usuario usuario_email_usuario_key21 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key21 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key21;
       public            Sistema JD_owner    false    217            ?           2606    1319335 #   usuario usuario_email_usuario_key22 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key22 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key22;
       public            Sistema JD_owner    false    217            A           2606    1319405 #   usuario usuario_email_usuario_key23 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key23 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key23;
       public            Sistema JD_owner    false    217            C           2606    1319333 #   usuario usuario_email_usuario_key24 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key24 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key24;
       public            Sistema JD_owner    false    217            E           2606    1319407 #   usuario usuario_email_usuario_key25 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key25 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key25;
       public            Sistema JD_owner    false    217            G           2606    1319331 #   usuario usuario_email_usuario_key26 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key26 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key26;
       public            Sistema JD_owner    false    217            I           2606    1319411 #   usuario usuario_email_usuario_key27 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key27 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key27;
       public            Sistema JD_owner    false    217            K           2606    1319329 #   usuario usuario_email_usuario_key28 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key28 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key28;
       public            Sistema JD_owner    false    217            M           2606    1319417 #   usuario usuario_email_usuario_key29 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key29 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key29;
       public            Sistema JD_owner    false    217            O           2606    1319353 "   usuario usuario_email_usuario_key3 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key3 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key3;
       public            Sistema JD_owner    false    217            Q           2606    1319327 #   usuario usuario_email_usuario_key30 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key30 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key30;
       public            Sistema JD_owner    false    217            S           2606    1319419 #   usuario usuario_email_usuario_key31 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key31 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key31;
       public            Sistema JD_owner    false    217            U           2606    1319325 #   usuario usuario_email_usuario_key32 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key32 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key32;
       public            Sistema JD_owner    false    217            W           2606    1319421 #   usuario usuario_email_usuario_key33 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key33 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key33;
       public            Sistema JD_owner    false    217            Y           2606    1319323 #   usuario usuario_email_usuario_key34 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key34 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key34;
       public            Sistema JD_owner    false    217            [           2606    1319425 #   usuario usuario_email_usuario_key35 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key35 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key35;
       public            Sistema JD_owner    false    217            ]           2606    1319321 #   usuario usuario_email_usuario_key36 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key36 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key36;
       public            Sistema JD_owner    false    217            _           2606    1319415 #   usuario usuario_email_usuario_key37 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key37 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key37;
       public            Sistema JD_owner    false    217            a           2606    1319319 #   usuario usuario_email_usuario_key38 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key38 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key38;
       public            Sistema JD_owner    false    217            c           2606    1319403 #   usuario usuario_email_usuario_key39 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key39 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key39;
       public            Sistema JD_owner    false    217            e           2606    1319371 "   usuario usuario_email_usuario_key4 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key4 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key4;
       public            Sistema JD_owner    false    217            g           2606    1319315 #   usuario usuario_email_usuario_key40 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key40 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key40;
       public            Sistema JD_owner    false    217            i           2606    1319367 #   usuario usuario_email_usuario_key41 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key41 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key41;
       public            Sistema JD_owner    false    217            k           2606    1319313 #   usuario usuario_email_usuario_key42 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key42 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key42;
       public            Sistema JD_owner    false    217            m           2606    1319427 #   usuario usuario_email_usuario_key43 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key43 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key43;
       public            Sistema JD_owner    false    217            o           2606    1319311 #   usuario usuario_email_usuario_key44 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key44 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key44;
       public            Sistema JD_owner    false    217            q           2606    1319309 #   usuario usuario_email_usuario_key45 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key45 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key45;
       public            Sistema JD_owner    false    217            s           2606    1319429 #   usuario usuario_email_usuario_key46 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key46 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key46;
       public            Sistema JD_owner    false    217            u           2606    1319307 #   usuario usuario_email_usuario_key47 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key47 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key47;
       public            Sistema JD_owner    false    217            w           2606    1319433 #   usuario usuario_email_usuario_key48 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key48 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key48;
       public            Sistema JD_owner    false    217            y           2606    1319303 #   usuario usuario_email_usuario_key49 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key49 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key49;
       public            Sistema JD_owner    false    217            {           2606    1319351 "   usuario usuario_email_usuario_key5 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key5 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key5;
       public            Sistema JD_owner    false    217            }           2606    1319435 #   usuario usuario_email_usuario_key50 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key50 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key50;
       public            Sistema JD_owner    false    217                       2606    1319301 #   usuario usuario_email_usuario_key51 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key51 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key51;
       public            Sistema JD_owner    false    217            �           2606    1319437 #   usuario usuario_email_usuario_key52 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key52 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key52;
       public            Sistema JD_owner    false    217            �           2606    1319305 #   usuario usuario_email_usuario_key53 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key53 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key53;
       public            Sistema JD_owner    false    217            �           2606    1319299 #   usuario usuario_email_usuario_key54 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key54 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key54;
       public            Sistema JD_owner    false    217            �           2606    1319441 #   usuario usuario_email_usuario_key55 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key55 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key55;
       public            Sistema JD_owner    false    217            �           2606    1319297 #   usuario usuario_email_usuario_key56 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key56 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key56;
       public            Sistema JD_owner    false    217            �           2606    1319443 #   usuario usuario_email_usuario_key57 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key57 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key57;
       public            Sistema JD_owner    false    217            �           2606    1319295 #   usuario usuario_email_usuario_key58 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key58 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key58;
       public            Sistema JD_owner    false    217            �           2606    1319445 #   usuario usuario_email_usuario_key59 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key59 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key59;
       public            Sistema JD_owner    false    217            �           2606    1319373 "   usuario usuario_email_usuario_key6 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key6 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key6;
       public            Sistema JD_owner    false    217            �           2606    1319293 #   usuario usuario_email_usuario_key60 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key60 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key60;
       public            Sistema JD_owner    false    217            �           2606    1319449 #   usuario usuario_email_usuario_key61 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key61 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key61;
       public            Sistema JD_owner    false    217            �           2606    1319451 #   usuario usuario_email_usuario_key62 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key62 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key62;
       public            Sistema JD_owner    false    217            �           2606    1319291 #   usuario usuario_email_usuario_key63 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key63 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key63;
       public            Sistema JD_owner    false    217            �           2606    1319453 #   usuario usuario_email_usuario_key64 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key64 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key64;
       public            Sistema JD_owner    false    217            �           2606    1319289 #   usuario usuario_email_usuario_key65 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key65 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key65;
       public            Sistema JD_owner    false    217            �           2606    1319287 #   usuario usuario_email_usuario_key66 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key66 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key66;
       public            Sistema JD_owner    false    217            �           2606    1319447 #   usuario usuario_email_usuario_key67 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key67 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key67;
       public            Sistema JD_owner    false    217            �           2606    1319285 #   usuario usuario_email_usuario_key68 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key68 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key68;
       public            Sistema JD_owner    false    217            �           2606    1319439 #   usuario usuario_email_usuario_key69 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key69 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key69;
       public            Sistema JD_owner    false    217            �           2606    1319347 "   usuario usuario_email_usuario_key7 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key7 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key7;
       public            Sistema JD_owner    false    217            �           2606    1319279 #   usuario usuario_email_usuario_key70 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key70 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key70;
       public            Sistema JD_owner    false    217            �           2606    1319431 #   usuario usuario_email_usuario_key71 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key71 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key71;
       public            Sistema JD_owner    false    217            �           2606    1319277 #   usuario usuario_email_usuario_key72 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key72 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key72;
       public            Sistema JD_owner    false    217            �           2606    1319397 #   usuario usuario_email_usuario_key73 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key73 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key73;
       public            Sistema JD_owner    false    217            �           2606    1319275 #   usuario usuario_email_usuario_key74 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key74 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key74;
       public            Sistema JD_owner    false    217            �           2606    1319389 #   usuario usuario_email_usuario_key75 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key75 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key75;
       public            Sistema JD_owner    false    217            �           2606    1319273 #   usuario usuario_email_usuario_key76 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key76 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key76;
       public            Sistema JD_owner    false    217            �           2606    1319385 #   usuario usuario_email_usuario_key77 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key77 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key77;
       public            Sistema JD_owner    false    217            �           2606    1319271 #   usuario usuario_email_usuario_key78 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key78 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key78;
       public            Sistema JD_owner    false    217            �           2606    1319377 #   usuario usuario_email_usuario_key79 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key79 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key79;
       public            Sistema JD_owner    false    217            �           2606    1319375 "   usuario usuario_email_usuario_key8 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key8 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key8;
       public            Sistema JD_owner    false    217            �           2606    1319269 #   usuario usuario_email_usuario_key80 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key80 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key80;
       public            Sistema JD_owner    false    217            �           2606    1319369 #   usuario usuario_email_usuario_key81 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key81 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key81;
       public            Sistema JD_owner    false    217            �           2606    1319267 #   usuario usuario_email_usuario_key82 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key82 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key82;
       public            Sistema JD_owner    false    217            �           2606    1319363 #   usuario usuario_email_usuario_key83 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key83 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key83;
       public            Sistema JD_owner    false    217            �           2606    1319265 #   usuario usuario_email_usuario_key84 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key84 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key84;
       public            Sistema JD_owner    false    217            �           2606    1319357 #   usuario usuario_email_usuario_key85 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key85 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key85;
       public            Sistema JD_owner    false    217            �           2606    1319263 #   usuario usuario_email_usuario_key86 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key86 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key86;
       public            Sistema JD_owner    false    217            �           2606    1319349 #   usuario usuario_email_usuario_key87 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key87 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key87;
       public            Sistema JD_owner    false    217            �           2606    1319261 #   usuario usuario_email_usuario_key88 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key88 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key88;
       public            Sistema JD_owner    false    217            �           2606    1319281 #   usuario usuario_email_usuario_key89 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key89 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key89;
       public            Sistema JD_owner    false    217            �           2606    1319379 "   usuario usuario_email_usuario_key9 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key9 UNIQUE (email_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key9;
       public            Sistema JD_owner    false    217            �           2606    1319317 #   usuario usuario_email_usuario_key90 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key90 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key90;
       public            Sistema JD_owner    false    217            �           2606    1319259 #   usuario usuario_email_usuario_key91 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key91 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key91;
       public            Sistema JD_owner    false    217            �           2606    1319455 #   usuario usuario_email_usuario_key92 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key92 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key92;
       public            Sistema JD_owner    false    217            �           2606    1319257 #   usuario usuario_email_usuario_key93 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key93 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key93;
       public            Sistema JD_owner    false    217            �           2606    1319255 #   usuario usuario_email_usuario_key94 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key94 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key94;
       public            Sistema JD_owner    false    217            �           2606    1319457 #   usuario usuario_email_usuario_key95 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key95 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key95;
       public            Sistema JD_owner    false    217            �           2606    1319461 #   usuario usuario_email_usuario_key96 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key96 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key96;
       public            Sistema JD_owner    false    217            �           2606    1319253 #   usuario usuario_email_usuario_key97 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key97 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key97;
       public            Sistema JD_owner    false    217            �           2606    1319251 #   usuario usuario_email_usuario_key98 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key98 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key98;
       public            Sistema JD_owner    false    217            �           2606    1319463 #   usuario usuario_email_usuario_key99 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_usuario_key99 UNIQUE (email_usuario);
 M   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_usuario_key99;
       public            Sistema JD_owner    false    217            �           2606    1319161    usuario usuario_rut_usuario_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key UNIQUE (rut_usuario);
 I   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key;
       public            Sistema JD_owner    false    217            �           2606    1319159     usuario usuario_rut_usuario_key1 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key1 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key1;
       public            Sistema JD_owner    false    217            �           2606    1319151 !   usuario usuario_rut_usuario_key10 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key10 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key10;
       public            Sistema JD_owner    false    217            �           2606    1318987 "   usuario usuario_rut_usuario_key100 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key100 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key100;
       public            Sistema JD_owner    false    217            �           2606    1318985 "   usuario usuario_rut_usuario_key101 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key101 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key101;
       public            Sistema JD_owner    false    217            �           2606    1319041 "   usuario usuario_rut_usuario_key102 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key102 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key102;
       public            Sistema JD_owner    false    217            �           2606    1318983 "   usuario usuario_rut_usuario_key103 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key103 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key103;
       public            Sistema JD_owner    false    217            �           2606    1318981 "   usuario usuario_rut_usuario_key104 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key104 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key104;
       public            Sistema JD_owner    false    217            �           2606    1318979 "   usuario usuario_rut_usuario_key105 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key105 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key105;
       public            Sistema JD_owner    false    217            �           2606    1318977 "   usuario usuario_rut_usuario_key106 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key106 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key106;
       public            Sistema JD_owner    false    217            �           2606    1318975 "   usuario usuario_rut_usuario_key107 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key107 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key107;
       public            Sistema JD_owner    false    217            �           2606    1319195 "   usuario usuario_rut_usuario_key108 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key108 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key108;
       public            Sistema JD_owner    false    217                       2606    1318973 "   usuario usuario_rut_usuario_key109 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key109 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key109;
       public            Sistema JD_owner    false    217                       2606    1319175 !   usuario usuario_rut_usuario_key11 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key11 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key11;
       public            Sistema JD_owner    false    217                       2606    1318971 "   usuario usuario_rut_usuario_key110 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key110 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key110;
       public            Sistema JD_owner    false    217                       2606    1319023 "   usuario usuario_rut_usuario_key111 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key111 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key111;
       public            Sistema JD_owner    false    217            	           2606    1318969 "   usuario usuario_rut_usuario_key112 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key112 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key112;
       public            Sistema JD_owner    false    217                       2606    1318967 "   usuario usuario_rut_usuario_key113 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key113 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key113;
       public            Sistema JD_owner    false    217                       2606    1318965 "   usuario usuario_rut_usuario_key114 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key114 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key114;
       public            Sistema JD_owner    false    217                       2606    1319197 "   usuario usuario_rut_usuario_key115 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key115 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key115;
       public            Sistema JD_owner    false    217                       2606    1318963 "   usuario usuario_rut_usuario_key116 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key116 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key116;
       public            Sistema JD_owner    false    217                       2606    1318961 "   usuario usuario_rut_usuario_key117 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key117 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key117;
       public            Sistema JD_owner    false    217                       2606    1318959 "   usuario usuario_rut_usuario_key118 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key118 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key118;
       public            Sistema JD_owner    false    217                       2606    1318957 "   usuario usuario_rut_usuario_key119 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key119 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key119;
       public            Sistema JD_owner    false    217                       2606    1319147 !   usuario usuario_rut_usuario_key12 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key12 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key12;
       public            Sistema JD_owner    false    217                       2606    1318955 "   usuario usuario_rut_usuario_key120 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key120 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key120;
       public            Sistema JD_owner    false    217                       2606    1319199 "   usuario usuario_rut_usuario_key121 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key121 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key121;
       public            Sistema JD_owner    false    217                       2606    1318953 "   usuario usuario_rut_usuario_key122 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key122 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key122;
       public            Sistema JD_owner    false    217            !           2606    1319201 "   usuario usuario_rut_usuario_key123 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key123 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key123;
       public            Sistema JD_owner    false    217            #           2606    1318951 "   usuario usuario_rut_usuario_key124 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key124 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key124;
       public            Sistema JD_owner    false    217            %           2606    1318949 "   usuario usuario_rut_usuario_key125 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key125 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key125;
       public            Sistema JD_owner    false    217            '           2606    1318947 "   usuario usuario_rut_usuario_key126 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key126 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key126;
       public            Sistema JD_owner    false    217            )           2606    1318945 "   usuario usuario_rut_usuario_key127 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key127 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key127;
       public            Sistema JD_owner    false    217            +           2606    1318943 "   usuario usuario_rut_usuario_key128 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key128 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key128;
       public            Sistema JD_owner    false    217            -           2606    1318941 "   usuario usuario_rut_usuario_key129 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key129 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key129;
       public            Sistema JD_owner    false    217            /           2606    1319145 !   usuario usuario_rut_usuario_key13 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key13 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key13;
       public            Sistema JD_owner    false    217            1           2606    1318939 "   usuario usuario_rut_usuario_key130 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key130 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key130;
       public            Sistema JD_owner    false    217            3           2606    1318937 "   usuario usuario_rut_usuario_key131 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key131 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key131;
       public            Sistema JD_owner    false    217            5           2606    1319173 "   usuario usuario_rut_usuario_key132 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key132 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key132;
       public            Sistema JD_owner    false    217            7           2606    1318935 "   usuario usuario_rut_usuario_key133 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key133 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key133;
       public            Sistema JD_owner    false    217            9           2606    1318933 "   usuario usuario_rut_usuario_key134 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key134 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key134;
       public            Sistema JD_owner    false    217            ;           2606    1318931 "   usuario usuario_rut_usuario_key135 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key135 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key135;
       public            Sistema JD_owner    false    217            =           2606    1318929 "   usuario usuario_rut_usuario_key136 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key136 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key136;
       public            Sistema JD_owner    false    217            ?           2606    1318927 "   usuario usuario_rut_usuario_key137 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key137 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key137;
       public            Sistema JD_owner    false    217            A           2606    1318925 "   usuario usuario_rut_usuario_key138 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key138 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key138;
       public            Sistema JD_owner    false    217            C           2606    1318923 "   usuario usuario_rut_usuario_key139 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key139 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key139;
       public            Sistema JD_owner    false    217            E           2606    1319143 !   usuario usuario_rut_usuario_key14 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key14 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key14;
       public            Sistema JD_owner    false    217            G           2606    1318921 "   usuario usuario_rut_usuario_key140 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key140 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key140;
       public            Sistema JD_owner    false    217            I           2606    1318919 "   usuario usuario_rut_usuario_key141 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key141 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key141;
       public            Sistema JD_owner    false    217            K           2606    1319203 "   usuario usuario_rut_usuario_key142 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key142 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key142;
       public            Sistema JD_owner    false    217            M           2606    1318917 "   usuario usuario_rut_usuario_key143 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key143 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key143;
       public            Sistema JD_owner    false    217            O           2606    1318915 "   usuario usuario_rut_usuario_key144 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key144 UNIQUE (rut_usuario);
 L   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key144;
       public            Sistema JD_owner    false    217            Q           2606    1319141 !   usuario usuario_rut_usuario_key15 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key15 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key15;
       public            Sistema JD_owner    false    217            S           2606    1319177 !   usuario usuario_rut_usuario_key16 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key16 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key16;
       public            Sistema JD_owner    false    217            U           2606    1319139 !   usuario usuario_rut_usuario_key17 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key17 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key17;
       public            Sistema JD_owner    false    217            W           2606    1319137 !   usuario usuario_rut_usuario_key18 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key18 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key18;
       public            Sistema JD_owner    false    217            Y           2606    1319179 !   usuario usuario_rut_usuario_key19 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key19 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key19;
       public            Sistema JD_owner    false    217            [           2606    1319163     usuario usuario_rut_usuario_key2 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key2 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key2;
       public            Sistema JD_owner    false    217            ]           2606    1319135 !   usuario usuario_rut_usuario_key20 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key20 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key20;
       public            Sistema JD_owner    false    217            _           2606    1319133 !   usuario usuario_rut_usuario_key21 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key21 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key21;
       public            Sistema JD_owner    false    217            a           2606    1319131 !   usuario usuario_rut_usuario_key22 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key22 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key22;
       public            Sistema JD_owner    false    217            c           2606    1319129 !   usuario usuario_rut_usuario_key23 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key23 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key23;
       public            Sistema JD_owner    false    217            e           2606    1319127 !   usuario usuario_rut_usuario_key24 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key24 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key24;
       public            Sistema JD_owner    false    217            g           2606    1319125 !   usuario usuario_rut_usuario_key25 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key25 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key25;
       public            Sistema JD_owner    false    217            i           2606    1319123 !   usuario usuario_rut_usuario_key26 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key26 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key26;
       public            Sistema JD_owner    false    217            k           2606    1319121 !   usuario usuario_rut_usuario_key27 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key27 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key27;
       public            Sistema JD_owner    false    217            m           2606    1319119 !   usuario usuario_rut_usuario_key28 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key28 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key28;
       public            Sistema JD_owner    false    217            o           2606    1319181 !   usuario usuario_rut_usuario_key29 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key29 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key29;
       public            Sistema JD_owner    false    217            q           2606    1319157     usuario usuario_rut_usuario_key3 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key3 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key3;
       public            Sistema JD_owner    false    217            s           2606    1319117 !   usuario usuario_rut_usuario_key30 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key30 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key30;
       public            Sistema JD_owner    false    217            u           2606    1319115 !   usuario usuario_rut_usuario_key31 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key31 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key31;
       public            Sistema JD_owner    false    217            w           2606    1319113 !   usuario usuario_rut_usuario_key32 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key32 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key32;
       public            Sistema JD_owner    false    217            y           2606    1319111 !   usuario usuario_rut_usuario_key33 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key33 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key33;
       public            Sistema JD_owner    false    217            {           2606    1319109 !   usuario usuario_rut_usuario_key34 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key34 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key34;
       public            Sistema JD_owner    false    217            }           2606    1319107 !   usuario usuario_rut_usuario_key35 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key35 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key35;
       public            Sistema JD_owner    false    217                       2606    1319105 !   usuario usuario_rut_usuario_key36 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key36 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key36;
       public            Sistema JD_owner    false    217            �           2606    1319103 !   usuario usuario_rut_usuario_key37 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key37 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key37;
       public            Sistema JD_owner    false    217            �           2606    1319101 !   usuario usuario_rut_usuario_key38 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key38 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key38;
       public            Sistema JD_owner    false    217            �           2606    1319099 !   usuario usuario_rut_usuario_key39 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key39 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key39;
       public            Sistema JD_owner    false    217            �           2606    1319165     usuario usuario_rut_usuario_key4 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key4 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key4;
       public            Sistema JD_owner    false    217            �           2606    1319097 !   usuario usuario_rut_usuario_key40 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key40 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key40;
       public            Sistema JD_owner    false    217            �           2606    1319095 !   usuario usuario_rut_usuario_key41 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key41 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key41;
       public            Sistema JD_owner    false    217            �           2606    1319093 !   usuario usuario_rut_usuario_key42 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key42 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key42;
       public            Sistema JD_owner    false    217            �           2606    1319183 !   usuario usuario_rut_usuario_key43 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key43 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key43;
       public            Sistema JD_owner    false    217            �           2606    1319091 !   usuario usuario_rut_usuario_key44 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key44 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key44;
       public            Sistema JD_owner    false    217            �           2606    1319089 !   usuario usuario_rut_usuario_key45 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key45 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key45;
       public            Sistema JD_owner    false    217            �           2606    1319087 !   usuario usuario_rut_usuario_key46 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key46 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key46;
       public            Sistema JD_owner    false    217            �           2606    1319085 !   usuario usuario_rut_usuario_key47 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key47 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key47;
       public            Sistema JD_owner    false    217            �           2606    1319083 !   usuario usuario_rut_usuario_key48 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key48 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key48;
       public            Sistema JD_owner    false    217            �           2606    1319079 !   usuario usuario_rut_usuario_key49 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key49 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key49;
       public            Sistema JD_owner    false    217            �           2606    1319155     usuario usuario_rut_usuario_key5 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key5 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key5;
       public            Sistema JD_owner    false    217            �           2606    1319077 !   usuario usuario_rut_usuario_key50 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key50 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key50;
       public            Sistema JD_owner    false    217            �           2606    1319075 !   usuario usuario_rut_usuario_key51 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key51 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key51;
       public            Sistema JD_owner    false    217            �           2606    1319073 !   usuario usuario_rut_usuario_key52 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key52 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key52;
       public            Sistema JD_owner    false    217            �           2606    1319081 !   usuario usuario_rut_usuario_key53 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key53 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key53;
       public            Sistema JD_owner    false    217            �           2606    1319071 !   usuario usuario_rut_usuario_key54 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key54 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key54;
       public            Sistema JD_owner    false    217            �           2606    1319069 !   usuario usuario_rut_usuario_key55 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key55 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key55;
       public            Sistema JD_owner    false    217            �           2606    1319067 !   usuario usuario_rut_usuario_key56 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key56 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key56;
       public            Sistema JD_owner    false    217            �           2606    1319065 !   usuario usuario_rut_usuario_key57 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key57 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key57;
       public            Sistema JD_owner    false    217            �           2606    1319063 !   usuario usuario_rut_usuario_key58 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key58 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key58;
       public            Sistema JD_owner    false    217            �           2606    1319061 !   usuario usuario_rut_usuario_key59 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key59 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key59;
       public            Sistema JD_owner    false    217            �           2606    1319167     usuario usuario_rut_usuario_key6 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key6 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key6;
       public            Sistema JD_owner    false    217            �           2606    1319059 !   usuario usuario_rut_usuario_key60 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key60 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key60;
       public            Sistema JD_owner    false    217            �           2606    1319057 !   usuario usuario_rut_usuario_key61 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key61 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key61;
       public            Sistema JD_owner    false    217            �           2606    1319185 !   usuario usuario_rut_usuario_key62 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key62 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key62;
       public            Sistema JD_owner    false    217            �           2606    1319055 !   usuario usuario_rut_usuario_key63 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key63 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key63;
       public            Sistema JD_owner    false    217            �           2606    1319053 !   usuario usuario_rut_usuario_key64 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key64 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key64;
       public            Sistema JD_owner    false    217            �           2606    1319149 !   usuario usuario_rut_usuario_key65 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key65 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key65;
       public            Sistema JD_owner    false    217            �           2606    1319051 !   usuario usuario_rut_usuario_key66 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key66 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key66;
       public            Sistema JD_owner    false    217            �           2606    1319049 !   usuario usuario_rut_usuario_key67 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key67 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key67;
       public            Sistema JD_owner    false    217            �           2606    1319047 !   usuario usuario_rut_usuario_key68 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key68 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key68;
       public            Sistema JD_owner    false    217            �           2606    1319045 !   usuario usuario_rut_usuario_key69 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key69 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key69;
       public            Sistema JD_owner    false    217            �           2606    1319153     usuario usuario_rut_usuario_key7 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key7 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key7;
       public            Sistema JD_owner    false    217            �           2606    1319043 !   usuario usuario_rut_usuario_key70 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key70 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key70;
       public            Sistema JD_owner    false    217            �           2606    1319187 !   usuario usuario_rut_usuario_key71 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key71 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key71;
       public            Sistema JD_owner    false    217            �           2606    1319003 !   usuario usuario_rut_usuario_key72 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key72 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key72;
       public            Sistema JD_owner    false    217            �           2606    1319001 !   usuario usuario_rut_usuario_key73 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key73 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key73;
       public            Sistema JD_owner    false    217            �           2606    1318999 !   usuario usuario_rut_usuario_key74 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key74 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key74;
       public            Sistema JD_owner    false    217            �           2606    1319039 !   usuario usuario_rut_usuario_key75 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key75 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key75;
       public            Sistema JD_owner    false    217            �           2606    1319037 !   usuario usuario_rut_usuario_key76 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key76 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key76;
       public            Sistema JD_owner    false    217            �           2606    1319035 !   usuario usuario_rut_usuario_key77 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key77 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key77;
       public            Sistema JD_owner    false    217            �           2606    1319033 !   usuario usuario_rut_usuario_key78 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key78 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key78;
       public            Sistema JD_owner    false    217            �           2606    1319029 !   usuario usuario_rut_usuario_key79 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key79 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key79;
       public            Sistema JD_owner    false    217            �           2606    1319169     usuario usuario_rut_usuario_key8 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key8 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key8;
       public            Sistema JD_owner    false    217            �           2606    1319027 !   usuario usuario_rut_usuario_key80 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key80 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key80;
       public            Sistema JD_owner    false    217            �           2606    1319025 !   usuario usuario_rut_usuario_key81 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key81 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key81;
       public            Sistema JD_owner    false    217            �           2606    1319021 !   usuario usuario_rut_usuario_key82 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key82 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key82;
       public            Sistema JD_owner    false    217            �           2606    1319019 !   usuario usuario_rut_usuario_key83 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key83 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key83;
       public            Sistema JD_owner    false    217            �           2606    1319017 !   usuario usuario_rut_usuario_key84 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key84 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key84;
       public            Sistema JD_owner    false    217            �           2606    1319015 !   usuario usuario_rut_usuario_key85 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key85 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key85;
       public            Sistema JD_owner    false    217            �           2606    1319013 !   usuario usuario_rut_usuario_key86 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key86 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key86;
       public            Sistema JD_owner    false    217            �           2606    1319011 !   usuario usuario_rut_usuario_key87 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key87 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key87;
       public            Sistema JD_owner    false    217            �           2606    1319009 !   usuario usuario_rut_usuario_key88 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key88 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key88;
       public            Sistema JD_owner    false    217            �           2606    1319007 !   usuario usuario_rut_usuario_key89 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key89 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key89;
       public            Sistema JD_owner    false    217            �           2606    1319171     usuario usuario_rut_usuario_key9 
   CONSTRAINT     b   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key9 UNIQUE (rut_usuario);
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key9;
       public            Sistema JD_owner    false    217            �           2606    1319031 !   usuario usuario_rut_usuario_key90 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key90 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key90;
       public            Sistema JD_owner    false    217            �           2606    1319005 !   usuario usuario_rut_usuario_key91 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key91 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key91;
       public            Sistema JD_owner    false    217            �           2606    1319189 !   usuario usuario_rut_usuario_key92 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key92 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key92;
       public            Sistema JD_owner    false    217            �           2606    1318997 !   usuario usuario_rut_usuario_key93 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key93 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key93;
       public            Sistema JD_owner    false    217            �           2606    1318995 !   usuario usuario_rut_usuario_key94 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key94 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key94;
       public            Sistema JD_owner    false    217                       2606    1319191 !   usuario usuario_rut_usuario_key95 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key95 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key95;
       public            Sistema JD_owner    false    217                       2606    1319193 !   usuario usuario_rut_usuario_key96 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key96 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key96;
       public            Sistema JD_owner    false    217                       2606    1318993 !   usuario usuario_rut_usuario_key97 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key97 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key97;
       public            Sistema JD_owner    false    217                       2606    1318991 !   usuario usuario_rut_usuario_key98 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key98 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key98;
       public            Sistema JD_owner    false    217            	           2606    1318989 !   usuario usuario_rut_usuario_key99 
   CONSTRAINT     c   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rut_usuario_key99 UNIQUE (rut_usuario);
 K   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rut_usuario_key99;
       public            Sistema JD_owner    false    217            �           2606    565290    ot_insumo FK_INSUMO    FK CONSTRAINT     ~   ALTER TABLE ONLY public.ot_insumo
    ADD CONSTRAINT "FK_INSUMO" FOREIGN KEY (id_insumo) REFERENCES public.insumo(id_insumo);
 ?   ALTER TABLE ONLY public.ot_insumo DROP CONSTRAINT "FK_INSUMO";
       public          Sistema JD_owner    false    230    233    4809            �           2606    565285    ot_insumo FK_OT    FK CONSTRAINT     n   ALTER TABLE ONLY public.ot_insumo
    ADD CONSTRAINT "FK_OT" FOREIGN KEY (id_ot) REFERENCES public.ot(id_ot);
 ;   ALTER TABLE ONLY public.ot_insumo DROP CONSTRAINT "FK_OT";
       public          Sistema JD_owner    false    4811    233    232            �           2606    1320065 7   cliente_metodo_pago cliente_metodo_pago_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_id_cliente_fkey;
       public          Sistema JD_owner    false    222    4117    219            �           2606    1320070 ;   cliente_metodo_pago cliente_metodo_pago_id_metodo_pago_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cliente_metodo_pago
    ADD CONSTRAINT cliente_metodo_pago_id_metodo_pago_fkey FOREIGN KEY (id_metodo_pago) REFERENCES public.metodos_pago(id_metodo_pago) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public.cliente_metodo_pago DROP CONSTRAINT cliente_metodo_pago_id_metodo_pago_fkey;
       public          Sistema JD_owner    false    4409    222    221            �           2606    1320075 5   contacto_comercial contacto_comercial_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.contacto_comercial
    ADD CONSTRAINT contacto_comercial_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.contacto_comercial DROP CONSTRAINT contacto_comercial_id_cliente_fkey;
       public          Sistema JD_owner    false    219    4117    226            �           2606    1320515 (   control_tiempo control_tiempo_id_it_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.control_tiempo
    ADD CONSTRAINT control_tiempo_id_it_fkey FOREIGN KEY (id_it) REFERENCES public.informe_trabajo(id_it) ON UPDATE CASCADE;
 R   ALTER TABLE ONLY public.control_tiempo DROP CONSTRAINT control_tiempo_id_it_fkey;
       public          Sistema JD_owner    false    4817    241    239            �           2606    1320080 7   informacion_de_pago informacion_de_pago_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informacion_de_pago
    ADD CONSTRAINT informacion_de_pago_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.informacion_de_pago DROP CONSTRAINT informacion_de_pago_id_cliente_fkey;
       public          Sistema JD_owner    false    224    219    4117            �           2606    1320499 /   informe_trabajo informe_trabajo_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informe_trabajo
    ADD CONSTRAINT informe_trabajo_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE;
 Y   ALTER TABLE ONLY public.informe_trabajo DROP CONSTRAINT informe_trabajo_id_cliente_fkey;
       public          Sistema JD_owner    false    219    239    4117            �           2606    1320509 /   informe_trabajo informe_trabajo_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informe_trabajo
    ADD CONSTRAINT informe_trabajo_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) ON UPDATE CASCADE;
 Y   ALTER TABLE ONLY public.informe_trabajo DROP CONSTRAINT informe_trabajo_id_maquina_fkey;
       public          Sistema JD_owner    false    243    239    4833            �           2606    1320504 *   informe_trabajo informe_trabajo_id_ot_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.informe_trabajo
    ADD CONSTRAINT informe_trabajo_id_ot_fkey FOREIGN KEY (id_ot) REFERENCES public.ot(id_ot) ON UPDATE CASCADE;
 T   ALTER TABLE ONLY public.informe_trabajo DROP CONSTRAINT informe_trabajo_id_ot_fkey;
       public          Sistema JD_owner    false    4811    239    232            �           2606    1320479    insumo insumo_id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumo
    ADD CONSTRAINT insumo_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categoria(id_categoria) ON UPDATE CASCADE;
 I   ALTER TABLE ONLY public.insumo DROP CONSTRAINT insumo_id_categoria_fkey;
       public          Sistema JD_owner    false    228    230    4417            �           2606    1320520 !   maquinas maquinas_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE;
 K   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_id_cliente_fkey;
       public          Sistema JD_owner    false    243    4117    219            �           2606    1320484    ot ot_id_cliente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ot
    ADD CONSTRAINT ot_id_cliente_fkey FOREIGN KEY (id_cliente) REFERENCES public.cliente(id_cliente) ON UPDATE CASCADE;
 ?   ALTER TABLE ONLY public.ot DROP CONSTRAINT ot_id_cliente_fkey;
       public          Sistema JD_owner    false    4117    219    232            �           2606    1320489    ot ot_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ot
    ADD CONSTRAINT ot_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) ON UPDATE CASCADE;
 ?   ALTER TABLE ONLY public.ot DROP CONSTRAINT ot_id_maquina_fkey;
       public          Sistema JD_owner    false    4833    243    232            �           2606    1320494    productos productos_id_ot_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_id_ot_fkey FOREIGN KEY (id_ot) REFERENCES public.ot(id_ot) ON UPDATE CASCADE;
 H   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_id_ot_fkey;
       public          Sistema JD_owner    false    232    237    4811            �           2606    1319496     usuario usuario_rol_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_rol_usuario_fkey FOREIGN KEY (rol_usuario) REFERENCES public.rol(id_rol) ON UPDATE CASCADE;
 J   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_rol_usuario_fkey;
       public          Sistema JD_owner    false    3269    216    217            <           826    16391     DEFAULT PRIVILEGES FOR SEQUENCES    DEFAULT ACL     {   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            ;           826    16390    DEFAULT PRIVILEGES FOR TABLES    DEFAULT ACL     x   ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;
          public          cloud_admin    false            �   7   x�3�J-(M-.�/�2��M�����9]�Rsr�L9�S��Ӹb���� ���      �   ;  x�]�MN�0��/�x�U;���JZ6E�t��)q[K�]�IQ�+�Ћ��.��7�{2(&�v�v�������{���Z��闀�B�Ldy�N�4�B�m�1���`����&-�9���K(��͹��O������� a՝G��?��A*.���|�.ao\OH-�}���>����ݸ�B�2�8���Æ"ruc"7�����r�A���j-��?�f/EK�u�1�ME��T�N/m0um���	
;4��C��� O�[l�9���@�֛jA�˫�
��ǝ�Q�@���"�uUj���9�"I�/Kl��      �   /   x���  ��e���.�?�e٘�M����(\

O�!����      �   �   x��O1�0��WxG��M�-�L<��j:�(E�.���c���Զ���β-X8�z�����&ܷ�Q��I� ��W��б��U;�����;���2���E10(hԜ!�y��rR�1��L�,J��5T����vn�b����4�	�x�Ol�m���|�2�| �3gM      �   `   x�M���0�P���b���\��ꋉ�x��Y�Pb�ēU�6��M.,�B��ρ�P��6񡕴.g��9'�d����:�/�����7(?!�      �   �   x���=�0Fg�ّ*�I�ef@��EQ(�7�\��o�z���>� a���}�]|�9s�ƌ>6m�[��'$)-Jc+�5(�C�|}σ�M�$�F)���ć�Jۊ�2HR�J
9s����.�[mU�"���u��۟��?݌: �e����q�      �   C  x�mQKN�0]ON��6)�V�
��T��Lc�X$5���p��z1Ʊ]t��<{��8\Wpwhp��y��lͤ���-�(�
Xrx\���zr3A�^�؍���L��X�v���#b���!Dx�GX�虱��;�4C�5̱���=u˪���{�F۝f�U��=t�qpk��cOv��t��BP�+\ 9я d>�i-!������!�Iه��Gpꘜ�	��$�f@RO�/�j_%	Y�Ծ��9]�
0�$��F���v,4?�Ԕ�r��܉:�x�S=}S��$�� �A�K��n]wA��UQ�"��0      �   <  x�mQ�n�0����l'���ЌY�-T�V )�G��	���a'K5�G�;�d����-����e�}Qj���G���w�ɧ��7;��5ly<��e�@�V&X��x!S*��I�];3�p����f��Zhe�pj����G�|,�< H]�ѭ��|�$<�J4�)���Q_ǧ	]S.�2Ğ=𺫤����:�:�T]��BI㇣�z8�1�b
"�_o�X�9E��E׏�{���2qY�cp��,
a�g�,I��(�F_�	.$��d�A���>�h�7��+$�P��L����UUU�(�o      �   �   x�E�Kj�0�ףS�*z�4*
^(��/����jdr�����������>���2.=�zp'��O���w�D��Q��xM����\����G���J
��࿿n�it�Ԧ\"m6��D�����ƹ ��g�Kʁ��x_J�]����Rb^��������+\ø��l�Y�ȇǯ��6�lYM��!���E�      �   �   x�}�;�@Dk�>�z
JgwF�+̆;��	���y�yKjb��B=�!�z�T�+�J����5�{����UOVxM���s���E��	�C��!��t.��}������s� |Z0�D`RN      �   l  x��RKN�0]ON����
	V|,
�f��$U�"ĝXq�^�q���²��g�͛�$\u>4��]�K\� �����)����P���u�K.d!d��og�?��cL����np��6�`N����0J+X\��3Y��FDCN������z�р�¯�J�����1BDA)�#?!�̐�V΀2�*;�G%1��9��M�{G،%�����}M�]ݦH�{�C̷ ^2����� ��9H���@rjc\_#ྠ��L�����,�#E���dtQV�t�e�}2����ٺGxW�&�y͏n�˪o�4AJ��`jfۤ�3�KT*N���&�[n�Q��ET'Y�}dd�M      �   s   x�e�K� ��aL)���xvF�n����DHH:o҇W`�����)Fp�g`.��w6�R��uA*Ȇ/;���wI+sj��FF���Q�}Ry�}����10�	',<      �   �   x�m�M
�0FדSx�����e)x7�F��*U�߉%��&�0󽗉+AJ�0-�uǣB�i-��('��>������+�e|"+2RE�:vJs�4#�P�2nY�&���n^���	+ǃ�������J c"�J�.ba臵א9v�\U9�d���~�?W      �   P   x�3�tL����,.)JL�/�2��JMKUHIUN-*�L���2��$��q�p:5�敤r�r�^���������� ��      �   �  x�u�Os�0�s����� ��ֵZ������E�����K븳�ә��<�!��"����2Q�!>E� �櫿I\f0*`Lvc�Ʃv��c���U���|�yIHa0]�$���<_��u�jۏ�w�']�h�B?��B@�B���u#�F��jŎB 9E%���kK��ƈ<�cY�C�^�O�g�r��{����@��|-J��O��"���B��rg��C�U?o�5vUX,�8d�[�����-	6>��n����&�x�
~<��ȀP0p�H
�˼ A6Ĥ�����/�ڲ�kȊ�~�Ya}�v��3�������D�S_O�z�K;��X�Hː@X� �u�+��G0��RH&�j���ט۴�m�Y���J�Y�m�0ۧrj�&۸�-�t_��Y-�l�ؾ}�!�7T�/��ƈ     