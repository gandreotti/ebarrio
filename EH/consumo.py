##=== COLABORACION DE PROYECTO ELECTROCONTROLATE DE SEBASTIAN CARRENO

import serial
import time
import MySQLdb
import datetime
import threading
from pymongo import MongoClient
import pymongo

tLock=threading.Lock()

##=== Subir Historial Condensacion a Mongo ===========================================
def SubeHistorialCondensacion(idsensor, temperatura, humedad, ventana):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
    	cursor = db.cursor()
    	sql = "SELECT idusuario, nombre FROM `USUARIO`"
    	try:
		client= MongoClient('mongodb://admin:efficienth2017@ds113841.mlab.com:13841/efficientmdb')
    		mdb=client['efficientmdb']

            	cursor.execute(sql)
            	results = cursor.fetchall()
            	for row in results:
                	idusuario = row[0]
                	nombre = row[1]
            	db.commit()

		horaActual = datetime.datetime.now() ##obtengo la hora
		fecha = time.strftime("%d/%m/%y") ##obtengo la fecha
		strHora = ""
		if horaActual.hour < 10:
			strHora = "0" + str(horaActual.hour)
		else:
			strHora = str(horaActual.hour)
		hora = strHora + ":00:00"
		coleccionHistCond = mdb.HistoricoCondensacion

		if coleccionHistCond.find({"id_sensor":idsensor, "id_usuario":idusuario, "hora":hora, "fecha": fecha}).count() > 0:	#Si existe
			coleccionHistCond.update({"id_sensor":idsensor, "id_usuario":idusuario, "hora":hora, "fecha":fecha},{"$set": {"nombre":nombre, "temperatura":temperatura, "humedad":humedad}}, upsert = False, multi = True)
		else:
			contadorHist = EntregarNuevaId(ObtenerUltimaInsercion(coleccionHistCond))
			datosHist={"_id":0,"id_usuario": 0,"nombre": 0,"id_sensor": 0, "temperatura": 0, "humedad": 0, "ventilacion": 0, "hora":0, "fecha":0}
			datosHist['_id'] = contadorHist
	            	datosHist['id_usuario'] = idusuario
	           	datosHist['nombre'] = nombre
	            	datosHist['id_sensor'] = idsensor
	            	datosHist['temperatura'] = temperatura
	            	datosHist['humedad'] = humedad
	            	datosHist['ventilacion'] = ventana
			datosHist['hora'] = hora
			datosHist['fecha'] = fecha
			convert2unicode(datosHist)
	            	coleccionHistCond.insert(datosHist)
	except Exception as e:
         	print(e);
		print "Error 27"
		db.rollback()

	# disconnect from server
	db.close()


##=== Realiza update de la Condensacion en la nube ===============================

def ModificarCondensacion(idsensor, temperatura, humedad, ventana):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
    	cursor = db.cursor()
    	sql = "SELECT idusuario, nombre FROM `USUARIO`"
    	try:
    		client= MongoClient('mongodb://admin:efficienth2017@ds113841.mlab.com:13841/efficientmdb')
    		mdb=client['efficientmdb']
            	cursor.execute(sql)
            	results = cursor.fetchall()
            	for row in results:
                	idusuario = row[0]
                	nombre = row[1]
            	db.commit()
        	coleccionCondMod = mdb.Condensacion
      	 	coleccionCondMod.update({"id_sensor":idsensor, "id_usuario":idusuario},{"$set": {"temperatura":temperatura, "humedad":humedad, "ventilacion":ventana}}, upsert = False, multi = True)
    	except Exception as e:
         	print(e);
		print "Error 26"

##=== Almacena la info de Condensacion en la nube =================================

def RegistroCond(opcion, datos, coleccion, idusuario, nombre, idsensor, contador, temperatura, humedad, ventana):
        if (opcion == 'cond'):
            tLock.acquire()
            datos['_id'] = contador
            datos['id_usuario'] = idusuario
            datos['nombre'] = nombre
            datos['id_sensor'] = idsensor
            datos['temperatura'] = temperatura
            datos['humedad'] = humedad
            datos['ventilacion'] = ventana
            while True:
                try:
		    convert2unicode(datos)
                    coleccion.insert(datos)
                    break
                except pymongo.errors.AutoReconnect or pymongo.errors.ServerSelectionTimeOutError:
                    print "error de conexion mongodb (condensacion)"
            tLock.release()

##=== Subir Condensacion a Mongo ===========================================
def SubirCondensacion(idsensor, temperatura, humedad, ventana):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
    	cursor = db.cursor()
    	sql = "SELECT idusuario, nombre, NOW()- INTERVAL 1 HOUR FROM `USUARIO`"
    	try:
    		client= MongoClient('mongodb://admin:efficienth2017@ds113841.mlab.com:13841/efficientmdb')
    		mdb=client['efficientmdb']
            	cursor.execute(sql)
            	results = cursor.fetchall()
            	for row in results:
                	idusuario = row[0]
                	nombre = row[1]
                	fecha = row[2]
            	db.commit()
            	datosCond={"_id":0,"id_usuario": 0,"nombre": 0,"id_sensor": 0, "temperatura": 0, "humedad": 0, "ventilacion": 0}

        	coleccionCond = mdb.Condensacion
        	contadorCond = EntregarNuevaId(ObtenerUltimaInsercion(coleccionCond))
		sube=threading.Thread(target=RegistroCond,args=('cond', datosCond, coleccionCond, idusuario, nombre, idsensor, contadorCond, temperatura, humedad, ventana))
   		sube.start()

	except Exception as e:
         	print(e);
		print "Error 25"

##=== Realiza el update de la tabla condensacion ===============
def UpdateCondensacion(idsensor, temperatura, humedad, ventana):
   	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "UPDATE `CONDENSACION` set `temperatura` = " + str(temperatura) + ", `humedad` = " + str(humedad) + ",`ventana` = " + str(ventana) + " WHERE idsensor = " + str(idsensor)
	try:
		cursor.execute(sql)
		db.commit()
		ModificarCondensacion(idsensor, temperatura, humedad, ventana)
	except Exception as e:
                print(e);
		print "Error 24"
		db.rollback()

	# disconnect from server
	db.close()

##=== Realiza la insercion en la tabla condensacion ===============
def InsertCondensacion(idsensor, temperatura, humedad, ventana):
    	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "INSERT INTO `CONDENSACION` (`idsensor`, `temperatura`, `humedad`,`ventana`) VALUES (" + str(idsensor) + ", " + str(temperatura) + ", " + str(humedad) + ", " + str(ventana) + ")"
	try:
		cursor.execute(sql)
		db.commit()
		SubirCondensacion(idsensor, temperatura, humedad, ventana)
	except Exception as e:
                print(e);
		print "Error 23"
		db.rollback()

	# disconnect from server
	db.close()

##=== Agrega datos de condensacion a la tabla =====================
def AgregarCondensacion(idsensor, temperatura, humedad, ventana):
    	#print str(idsensor)
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "SELECT * FROM `CONDENSACION` WHERE idsensor = " + str(idsensor)
	try:
		cursor.execute(sql)
		results = cursor.fetchall()
        	contador = 0
		for row in results:
			contador = 1
		db.commit()
        	if contador == 1:
            		UpdateCondensacion(idsensor, temperatura, humedad, ventana)
        	else:
            		InsertCondensacion(idsensor, temperatura, humedad, ventana)
		horaActual = datetime.datetime.now() ##obtengo la hora
		if horaActual.minute == 0 and horaActual.second < 13: ## si son los primeros 13 segundos de cada hora
			SubeHistorialCondensacion(idsensor, temperatura, humedad, ventana)
	except Exception as e:
                print(e);
		print "Error 22"
		db.rollback()

	# disconnect from server
	db.close()

##=== Transforma a unicode ========================================

def convert2unicode(mydict):
	for k, v in mydict.iteritems():
        	if isinstance(v, str):
            		mydict[k] = unicode(v, errors = 'replace')
        	elif isinstance(v, dict):
            		convert2unicode(v)

##=== Almacena la info de Consumo en la nube =================================

def registro(valor, opcion, datos, coleccion, idusuario, nombre, idsensor, contador, costo, fecha):
        if (opcion == 'temporal'):
            tLock.acquire()
            datos['_id'] = contador
            datos['id_usuario'] = idusuario
            datos['nombre'] = nombre
            datos['id_sensor'] = idsensor
            datos['fecha'] = time.strftime("%d/%m/%y")
            datos['hora'] = time.strftime("%I :%M %P")
            datos['watts'] = valor
            while True:
                try:
		    convert2unicode(datos)
                    coleccion.insert(datos)
                    #print "insercion temporal a mongodb exitosa"
                    break
                except pymongo.errors.AutoReconnect or pymongo.errors.ServerSelectionTimeOutError:
                    print "error de conexion mongodb (consumoTemp)"
            tLock.release()
        elif (opcion == 'dia'):
            tLock.acquire()
            datos['_id'] = contador
            datos['id_usuario'] = idusuario
            datos['nombre'] = nombre
            datos['id_sensor'] = idsensor
            datos['fecha'] = fecha.strftime("%d/%m/%y")
            datos['kwh'] = valor
            datos['costokwh'] = costo
            while True:
                try:
		    convert2unicode(datos)
                    coleccion.insert(datos)
                    #print "insercion diaria a mongodb exitosa"
                    break
                except pymongo.errors.AutoReconnect or pymongo.errors.ServerSelectionTimeOutError:
                    print "error de conexion mongodb (consumoDia)"
            tLock.release()
        elif (opcion == 'mes'):
            tLock.acquire()
            datos['_id'] = contador
            datos['id_usuario'] = idusuario
            datos['nombre'] = nombre
            datos['id_sensor'] = idsensor
            datos['mes'] = fecha.strftime("%m")
            datos['anio'] = fecha.strftime("%y")
            datos['kwh'] = int(valor)
            datos['costokwh'] = int(costo)
            while True:
                try:
		    convert2unicode(datos)
                    coleccion.insert(datos)
                    #print "insercion mensual a mongodb exitosa"
                    break
                except pymongo.errors.AutoReconnect or pymongo.errors.ServerSelectionTimeOutError:
                    print "error de conexion mongodb (consumoMes)"
            tLock.release()


##=== Recupera ID de MDB ===========================================

def EntregarNuevaId(UltimaInsercionMDB):
    return UltimaInsercionMDB['_id']+1

def ObtenerUltimaInsercion(MDBColeccion):
    if (len(list(MDBColeccion.find()))==0):
        MDBColeccion.insert({'_id':0})
    return list(MDBColeccion.find().sort('_id',1))[-1]

##=== Subir Mes a Mongo ===========================================
def SubirMes(kwh, costo):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
    	cursor = db.cursor()
    	sql = "SELECT idusuario, nombre, idsensor, NOW()- INTERVAL 1 HOUR FROM `USUARIO`"
    	try:
    		client= MongoClient('mongodb://admin:efficienth2017@ds113841.mlab.com:13841/efficientmdb')
    		mdb=client['efficientmdb']

            	cursor.execute(sql)
            	results = cursor.fetchall()
            	for row in results:
                	idusuario = row[0]
                	nombre = row[1]
                	idsensor = row[2]
                	fecha = row[3]
            	db.commit()
            	datosMes={"_id":0,"id_usuario": 0,"nombre": 0,"id_sensor": 0, "mes": 0, "anio": 0, "kwh": 0, "costokwh" : 0}

        	coleccionMes = mdb.ConsumoMes
        	contadorMes = EntregarNuevaId(ObtenerUltimaInsercion(coleccionMes))
		sube=threading.Thread(target=registro,args=(kwh, 'mes', datosMes, coleccionMes, idusuario, nombre, idsensor, contadorMes, costo, fecha))
   		sube.start()

	except Exception as e:
         	print(e);
		print "Error 21"
		db.rollback()

	# disconnect from server
	db.close()


##=== Subir Dia a Mongo ===========================================
def SubirDia(kwh, costo):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
    	cursor = db.cursor()
    	sql = "SELECT idusuario, nombre, idsensor, NOW()- INTERVAL 1 HOUR FROM `USUARIO`"
    	try:
    		client= MongoClient('mongodb://admin:efficienth2017@ds113841.mlab.com:13841/efficientmdb')
    		mdb=client['efficientmdb']

            	cursor.execute(sql)
            	results = cursor.fetchall()
            	for row in results:
                	idusuario = row[0]
                	nombre = row[1]
                	idsensor = row[2]
                	fecha = row[3]
            	db.commit()
            	datosDia={"_id":0,"id_usuario": 0,"nombre": 0,"id_sensor": 0, "fecha": 0, "kwh": 0, "costokwh" : 0}

        	coleccionDia = mdb.ConsumoDia
        	contadorDia = EntregarNuevaId(ObtenerUltimaInsercion(coleccionDia))
		sube=threading.Thread(target=registro,args=(kwh, 'dia', datosDia, coleccionDia, idusuario, nombre, idsensor, contadorDia, int(costo), fecha))
   		sube.start()

	except Exception as e:
         	print(e);
		print "Error 21"
		db.rollback()

	# disconnect from server
	db.close()

##=== Subir Watt a Mongo ===========================================
def SubirWatt(wattActual):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
    	cursor = db.cursor()
    	sql = "SELECT idusuario, nombre, idsensor FROM `USUARIO`"
    	try:
    		client= MongoClient('mongodb://admin:efficienth2017@ds113841.mlab.com:13841/efficientmdb')
    		mdb=client['efficientmdb']

            	cursor.execute(sql)
            	results = cursor.fetchall()
            	for row in results:
                	idusuario = row[0]
                	nombre = row[1]
                	idsensor = row[2]
            	db.commit()

            	datosTemp={"_id":0,"id_usuario": 0,"nombre": 0,"id_sensor": 0, "fecha": 0, "hora": 0, "watts": 0}

        	coleccionTemp = mdb.ConsumoTemp
        	contadorTemp = EntregarNuevaId(ObtenerUltimaInsercion(coleccionTemp))
		sube=threading.Thread(target=registro,args=(wattActual, 'temporal', datosTemp, coleccionTemp, idusuario, nombre, idsensor, contadorTemp,0, ''))
   		sube.start()

	except Exception as e:
         	print(e);
		print "Error 20"
		db.rollback()

	# disconnect from server
	db.close()

##=== Inserta nueva meta ===========================================

def AgregarMeta(meta):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "INSERT INTO `META` (`idsensor`, `anio`, `mes`,`monto`) VALUES ('1', YEAR(CURDATE()), MONTH(CURDATE()), "+str(meta)+")"
	try:
		cursor.execute(sql)
		db.commit()
	except Exception as e:
            	print(e);
		print "Error 19"
		db.rollback()

	# disconnect from server
	db.close()

##=== Busca la ultima meta y luego llama a la funcion para insertar ===========================================

def ActualizaMeta():
        db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
        cursor = db.cursor()
        sql = "SELECT monto FROM `META` WHERE idsensor = '1' and anio = YEAR(DATE_ADD(CURDATE(),INTERVAL -1 MONTH)) and mes = MONTH(DATE_ADD(CURDATE(),INTERVAL -1 MONTH))"
        try:
                cursor.execute(sql)
                results = cursor.fetchall()
                for row in results:
                        meta = row[0]
                db.commit()
                AgregarMeta(meta)
        except Exception as e:
                print(e);
                print "Error 18"
                db.rollback()

        # disconnect from server
        db.close()


##=== Borra toda la tabla POTENCIA_POR_DIA luego de guardar un mes ===========================================

def BorrarDias():
        db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
        cursor = db.cursor()
        sql = "DELETE FROM `POTENCIA_POR_DIA`"
        try:
                cursor.execute(sql)
                db.commit()
        except Exception as e:
                print(e);
                print "Error 17"
                db.rollback()

        # disconnect from server
        db.close()

##=== Metodo que ingresa los kwh del mes ==================================================================

def IngresarMes(kwhMes, costo):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "INSERT INTO `POTENCIA_POR_MES` (`idsensor`, `kwatt`, `fecha`,`costo`) VALUES ('1', '"+str(kwhMes)+"', NOW()- INTERVAL 1 HOUR, "+str(costo)+")"
	try:
		cursor.execute(sql)
		db.commit()
		BorrarDias()
        	ActualizaMeta()
        	SubirMes(kwhMes, costo)
	except Exception as e:
                print(e);
		print "Error 16"
		db.rollback()

	# disconnect from server
	db.close()

##=== Metodo que recolecta la informacion de todos los dias del mes que acaba de pasar, para ingresar el kwh total del mes =

def AgregarMes():
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "SELECT sum(t1.kwatt), sum(t1.costo), t2.valoradministracion FROM `POTENCIA_POR_DIA` t1 INNER JOIN VALOR t2  ON t2.idvalor = '1' WHERE MONTH(fecha) = MONTH(DATE_ADD(CURDATE(),INTERVAL -1 MONTH))"
	try:
		cursor.execute(sql)
		results = cursor.fetchall()
		for row in results:
			kwhMes = row[0]
			costo = row[1] + row[2]
		db.commit()
		IngresarMes(kwhMes, costo)
	except Exception as e:
                print(e);
		print "Error 15"
		db.rollback()

	# disconnect from server
	db.close()

##=== Borra toda la tabla POTENCIA_TEMP luego de guardar un dia ===========================================

def BorrarDiaActual():
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "DELETE FROM `POTENCIA_TEMP`"
	try:
		cursor.execute(sql)
		db.commit()
	except Exception as e:
                print(e);
		print "Error 14"
		db.rollback()

	 # disconnect from server
        db.close()

##=== Metodo que ingresa el dia una vez que se obtiene el kwh y costo asosiado de un dia ===================

def IngresarDia(kwhDia,costo):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "INSERT INTO `POTENCIA_POR_DIA` (`idsensor`, `kwatt`, `fecha`, `costo`) VALUES ('1', "+str(kwhDia)+", NOW()- INTERVAL 1 HOUR, "+str(costo)+")"
	try:
		cursor.execute(sql)
		db.commit()
		SubirDia(kwhDia, costo)
	except Exception as e:
                print(e);
		print "Error 13"
		db.rollback()

	# disconnect from server
	db.close()

##=== Obtengo el precio de los kwh respecto a la tension asignado a cada inmueble ==========================

def ObtenerPrecio(kwhDia):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	sql = "SELECT * FROM `VALOR`"
	try:
		cursor.execute(sql)
		results = cursor.fetchall()
		precioTotal = 0
		for row in results:
				precioTotal = (row[1] * kwhDia) +  (row[2] * kwhDia)
                BorrarDiaActual()
		IngresarDia(kwhDia,precioTotal)
	except Exception as e:
                print(e);
		print "Error 12"
		db.rollback()
	db.close()

##==== Funcion que convierte un tiempo (dato tipo TIME) en segundos ========================================

def ObtenerTiempoEnSegundos(tiempo):
	tiempo = str(tiempo).split(":")
	segundos = 0
	segundos += int(tiempo[0])*3600
	segundos += int(tiempo[1])*60
	segundos += int(tiempo[2])
	return segundos

##=== Metodo que recolecta los datos de todo el dia y los transforma a kwh para posteriormente ingresarlos =

def AgregarDia():
	horaActual = datetime.datetime.now() ##obtengo la hora
	if horaActual.hour == 0 and horaActual.minute == 0 and horaActual.second < 10: ## si son los primeros 10 segundos del dia
		time.sleep(10) ## 10 segundos de retardo
		db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
		cursor = db.cursor()
		sql = "SELECT * FROM `POTENCIA_TEMP`"
		try:
			cursor.execute(sql)
			results = cursor.fetchall()
			## Obtener el area generada bajo el grafico (principio de integral de riemann)
			contador = 0
			watt1 = 0
			tiempo1 = 0
			areaTotal = 0
			for row in results:
				if(contador == 0 ):
					watt1 = row[1]
					tiempo1 = ObtenerTiempoEnSegundos(row[2])
					contador += 1
				else:
					watt2 = row[1]
					tiempo2 = ObtenerTiempoEnSegundos(row[2])
					area1 = 0
					altura = 0
					base = tiempo2-tiempo1
					if watt1 > watt2:
						area1 = watt2*base
						altura= watt1-watt2
					else:
						area1 = watt1*base
						altura = watt2-watt1
					area2 = base*altura/2
					areaTotal += area1+area2
					contador = 0
			kwhDia = areaTotal/3600000 ## divido en 3600 para dejarlas expresadas en watts por hora y en 1000 para dejarlo en Kilo total en 3.6
			ObtenerPrecio(kwhDia)
			if horaActual.day == 1: ## si es el primer dia del mes
                        	AgregarMes()
		except Exception as e:
                        print(e);
			print "Error 11"
			db.rollback()
		db.close()

##==== Metodo que Agrega los watts tomados en el momento ========================================================

def AgregarWatt(wattActual):
	db = MySQLdb.connect("localhost","root","efficient","efficientbd" )
	cursor = db.cursor()
	##codigo con desfase de hora para servidores externos
	##sql = "INSERT INTO `POTENCIA ACTUAL` (`id_sensor`, `watt`, `hora`) VALUES ('1', '100', NOW()+ INTERVAL 3 HOUR)"
	sql = "INSERT INTO `POTENCIA_TEMP` (`idsensor`, `watt`, `hora`) VALUES ('1', '"+wattActual+"', NOW())"
	try:
		cursor.execute(sql)
		db.commit()
#		SubirWatt(wattActual);
	except Exception as e:
                print(e);
		print "Error 10"
		db.rollback()

	# disconnect from server
	db.close()

##==== Metodo de Inicializacion de programa ===================================================================

def IniciarPrograma():
	arduino=serial.Serial('/dev/ttyACM0',baudrate=9600, timeout = 3.0)
	arduino.close()
	arduino.open()
	txt=''
	cadena=''
	while True:
		time.sleep(0.1)
		while arduino.inWaiting() > 0:
			txt = arduino.read(1)
			if txt == ',':
        	                x = cadena.split(':')
	                        print 'C: ' + x[0] + ' T1: ' + x[1] + ' H1: ' + x[2] + ' V1: ' + x[3] + ' T2: ' + x[4] + ' H2: ' + x[5] + ' V2: ' + x[6]
                		AgregarWatt(x[0])
				AgregarDia()
                		## Sensor 1
                		AgregarCondensacion(1, x[1], x[2], x[3])
                		## Sensor 2
                		AgregarCondensacion(2, x[4], x[5], x[6])
                		x = ''
				cadena = ''
				txt = ''
			else:
				cadena+=txt
	arduino.close()

IniciarPrograma()

"""
##======= Hago un ciclo infinito buscando el numero del puerto en el que esta arduino ====================================

def BuscandoPuerto(buscarPuerto):
	time.sleep(0.4)
	try:
		print buscarPuerto
		if(buscarPuerto == 20):
			sys.exit(0)
		arduino=serial.Serial(('/dev/ttyACM'+str(buscarPuerto)),baudrate=9600, timeout = 3.0)
		IniciarPrograma(arduino)
	except:
		print "fallo en"
		BuscandoPuerto(buscarPuerto+1)


###====== Aqui parte el codigo ===========================================================================================
buscarPuerto = 0
BuscandoPuerto(buscarPuerto)
"""
