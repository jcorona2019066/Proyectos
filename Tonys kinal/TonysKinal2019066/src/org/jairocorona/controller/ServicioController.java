package org.jairocorona.controller;

import eu.schudt.javafx.controls.calendar.DatePicker;
import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.layout.GridPane;
import javax.swing.JOptionPane;
import org.jairocorona.bean.Empresa;
import org.jairocorona.bean.Servicio;
import org.jairocorona.db.Conexion;
import org.jairocorona.system.Principal;


public class ServicioController implements Initializable{
    private Principal escenarioPrincipal;
    private enum operaciones{NUEVO,GUARDAR,ELIMINAR,EDITAR,ACTUALIZAR,CANCELAR,NINGUNO};
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private ObservableList<Servicio> listaServicio;
    private ObservableList<Empresa> listaEmpresa;
    private DatePicker fecha;
    @FXML private TextField txtCodigoServicio;
    @FXML private GridPane grpFechaServicio;
    @FXML private TextField txtTipoServicio;
    @FXML private TextField txtHoraServicio;
    @FXML private TextField txtLugarServicio;
    @FXML private TextField txtTelefonoContacto;
    @FXML private ComboBox cmbCodigoEmpresa;
    @FXML private TableView tblServicio;
    @FXML private TableColumn colCodigoServicio;
    @FXML private TableColumn colFechaServicio;
    @FXML private TableColumn colTipoServicio;
    @FXML private TableColumn colHoraServicio;
    @FXML private TableColumn colLugarServicio;
    @FXML private TableColumn colTelefonoContacto;
    @FXML private TableColumn colCodigoEmpresa;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cargarDatos();
        cmbCodigoEmpresa.setItems(getEmpresa());
        fecha = new DatePicker(Locale.ENGLISH);
        fecha.setDateFormat(new SimpleDateFormat("yyy-MM-dd"));
        fecha.getCalendarView().todayButtonTextProperty().set("Today");
        fecha.getCalendarView().setShowWeeks(false);
        fecha.getStylesheets().add("/org/jairocorona/resource/DatePicker.css");
        fecha.selectedDateProperty().set(null);
        grpFechaServicio.add(fecha, 0, 0);
    }
    
    public void cargarDatos(){
        tblServicio.setItems(getServicio());
        colCodigoServicio.setCellValueFactory(new PropertyValueFactory<Servicio, Integer>("codigoServicio"));
        colFechaServicio.setCellValueFactory(new PropertyValueFactory <Servicio, Date>("fechaServicio"));
        colTipoServicio.setCellValueFactory(new PropertyValueFactory<Servicio, String>("tipoServicio"));
        colHoraServicio.setCellValueFactory(new PropertyValueFactory<Servicio, String>("horaServicio"));
        colLugarServicio.setCellValueFactory(new PropertyValueFactory<Servicio, String>("lugarServicio"));
        colTelefonoContacto.setCellValueFactory(new PropertyValueFactory<Servicio, String>("telefonoContacto"));
        colCodigoEmpresa.setCellValueFactory(new PropertyValueFactory<Servicio, Integer>("codigoEmpresa"));
    }
    
    public void seleccionarElemento(){
     txtCodigoServicio.setText(String.valueOf(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getCodigoEmpresa()));
     fecha.selectedDateProperty().set(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getFechaServicio());
     txtTipoServicio.setText(String.valueOf(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getTipoServicio()));
     txtHoraServicio.setText(String.valueOf(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getHoraServicio()));
     txtLugarServicio.setText(String.valueOf(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getLugarServicio()));
     txtTelefonoContacto.setText(String.valueOf(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getTelefonoContacto()));
     cmbCodigoEmpresa.getSelectionModel().select(buscarEmpresa(((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getCodigoEmpresa()));
    }
    
     
    
    public ObservableList<Servicio> getServicio(){
        ArrayList<Servicio> lista = new ArrayList<Servicio>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ListarServicios}");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Servicio(resultado.getInt("codigoServicio"),
                              resultado.getDate("fechaServicio"),
                              resultado.getString("tipoServicio"),
                              resultado.getString("horaServicio"),
                              resultado.getString("lugarServicio"),
                              resultado.getString("telefonoContacto"),
                              resultado.getInt("codigoEmpresa")));               
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        
        return listaServicio = FXCollections.observableArrayList(lista);
    }
    
    
    public ObservableList <Empresa> getEmpresa(){
        ArrayList<Empresa> lista = new ArrayList<Empresa>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ListarEmpresas}");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new Empresa(  resultado.getInt("codigoEmpresa"),
                                        resultado.getString("nombreEmpresa"),
                                        resultado.getString("direccion"),
                                        resultado.getString("telefono")));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaEmpresa = FXCollections.observableArrayList(lista);
    }
    
    public Empresa buscarEmpresa(int codigoEmpresa){
        Empresa resultado = null;
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_BuscarEmpresas(?)}");
            procedimiento.setInt(1, codigoEmpresa);
            ResultSet registro = procedimiento.executeQuery();
            while(registro.next()){
                resultado = new Empresa(registro.getInt("codigoEmpresa"),
                                        registro.getString("nombreEmpresa"),
                                        registro.getString("direccion"),
                                        registro.getString("telefono"));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
         return resultado;
    }
    
    public void nuevo(){
        switch (tipoDeOperacion){
         case NINGUNO:
             limpiarControles();
             activarControles();
             btnNuevo.setText("Guardar");
             btnEliminar.setDisable(false);
             btnEliminar.setText("Cancelar");
             btnEditar.setDisable(true);
             btnReporte.setDisable(true);
             tipoDeOperacion = operaciones.GUARDAR;
            break;
         case GUARDAR:
             if((txtTelefonoContacto.getText().equals("")) ){
                 JOptionPane.showMessageDialog(null, "Ingrese mas Datos");
                 //limpiarControles();
             }else{
                 try{
                    guardar();
                    desactivarControles();
                    limpiarControles();
                    btnNuevo.setText("Nuevo");
                    btnEliminar.setText("Eliminar");
                    btnEliminar.setDisable(false);
                    btnEditar.setDisable(false);
                    btnReporte.setDisable(false);
                    tipoDeOperacion = operaciones.NINGUNO;
                    cargarDatos();
                    break;
                 }catch(Exception e){
                     e.printStackTrace();
                 }
             }
             
     }
    }
    
    public void guardar(){
        Servicio registro = new Servicio();
        registro.setFechaServicio(fecha.getSelectedDate());
        registro.setTipoServicio(txtTipoServicio.getText());
        registro.setHoraServicio(txtHoraServicio.getText());
        registro.setLugarServicio(txtLugarServicio.getText());
        registro.setTelefonoContacto(txtTelefonoContacto.getText());
        registro.setCodigoEmpresa(((Empresa)cmbCodigoEmpresa.getSelectionModel().getSelectedItem()).getCodigoEmpresa());
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_AgregarServicios(?,?,?,?,?,?)}");
            procedimiento.setDate(1, new java.sql.Date(registro.getFechaServicio().getTime()));
            procedimiento.setString(2, registro.getTipoServicio());
            procedimiento.setString(3, registro.getHoraServicio());
            procedimiento.setString(4, registro.getLugarServicio());
            procedimiento.setString(5, registro.getTelefonoContacto());
            procedimiento.setInt(6, registro.getCodigoEmpresa());
            procedimiento.execute();
            listaServicio.add(registro);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    
    public void eliminar(){
        switch(tipoDeOperacion){
        case GUARDAR:
             desactivarControles();
             limpiarControles();
             btnNuevo.setText("Nuevo");
             btnNuevo.setDisable(false);
             btnEliminar.setText("Eliminar");
             btnEliminar.setDisable(false);
             btnEditar.setDisable(false);
             btnReporte.setDisable(false);
             tipoDeOperacion = operaciones.NINGUNO;
            break;
        default:
            if(tblServicio.getSelectionModel().getSelectedItem() != null){
                int confirmacion = JOptionPane.showConfirmDialog(null,"Esta Seguro de eliminar","Eliminar Empleado",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
                if(confirmacion == JOptionPane.YES_OPTION){
                    try{
                        PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EliminarServicios(?)}");
                        procedimiento.setInt(1, ((Servicio)tblServicio.getSelectionModel().getSelectedItem()).getCodigoServicio());
                        procedimiento.execute();
                        listaServicio.remove(tblServicio.getSelectionModel().getSelectedIndex());
                    }catch(Exception e){
                        e.printStackTrace();
                    }
                }
            }else{
                JOptionPane.showMessageDialog(null, "Seleccione un Dato");
            }        
            break;
        }
    
    }
    
    public void editar(){
        switch(tipoDeOperacion){
            case NINGUNO:
               if(tblServicio.getSelectionModel().getSelectedItem() != null){   
                    btnEditar.setText("Actualizar");      
                    btnReporte.setText("Cancelar");
                    btnNuevo.setDisable(true);
                    btnEliminar.setDisable(true);
                    activarControles();            
                    tipoDeOperacion = operaciones.ACTUALIZAR; 
                }else{
                   JOptionPane.showMessageDialog(null, "Debe seleccionar un dato");
                }
                break;
            case ACTUALIZAR:
                actualizar();
                desactivarControles();
                limpiarControles();
                btnEditar.setText("Editar");
                btnReporte.setText("Reporte");
                btnNuevo.setDisable(false);
                btnEliminar.setDisable(false); 
                tipoDeOperacion = operaciones.NINGUNO;
                cargarDatos();
            break;
        }
    }
    
    
   public void actualizar(){
        try{
             PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ActualizarServicios(?,?,?,?,?,?,?)}");
             Servicio registro =(Servicio)tblServicio.getSelectionModel().getSelectedItem();
             registro.setFechaServicio(fecha.getSelectedDate());
             registro.setTipoServicio((txtTipoServicio.getText()));
             registro.setHoraServicio((txtHoraServicio.getText()));
             registro.setLugarServicio((txtLugarServicio.getText()));
             registro.setTelefonoContacto((txtTelefonoContacto.getText()));
             registro.setCodigoEmpresa(((Empresa)cmbCodigoEmpresa.getSelectionModel().getSelectedItem()).getCodigoEmpresa());
             procedimiento.setInt(1, registro.getCodigoServicio());
             procedimiento.setDate(2, new java.sql.Date(registro.getFechaServicio().getTime()));
             procedimiento.setString(3, registro.getTipoServicio());
             procedimiento.setString(4, registro.getHoraServicio());
             procedimiento.setString(5, registro.getLugarServicio());
             procedimiento.setString(6, registro.getTelefonoContacto());
             procedimiento.setInt(7, registro.getCodigoEmpresa());
             procedimiento.execute();
        }catch(Exception e){
             e.printStackTrace();
        }

    }
    
    public void reporte(){
        switch(tipoDeOperacion){
         case ACTUALIZAR:
             desactivarControles();
             limpiarControles();
             btnEditar.setText("Editar");
             btnEditar.setDisable(false);
             btnReporte.setText("Reporte");
             btnReporte.setDisable(false);
             btnNuevo.setDisable(false);
             btnEliminar.setDisable(false);
             tipoDeOperacion = operaciones.NINGUNO;
            break;
        }
    }
    
    
    
    public void desactivarControles(){
        txtCodigoServicio.setEditable(false);
        grpFechaServicio.setDisable(false);
        txtTipoServicio.setEditable(false);
        txtHoraServicio.setEditable(false);
        txtLugarServicio.setEditable(false);
        txtTelefonoContacto.setEditable(false);
        cmbCodigoEmpresa.setDisable(false);
    }
    
    public void activarControles(){
        txtCodigoServicio.setEditable(false);
        grpFechaServicio.setDisable(false);
        txtTipoServicio.setEditable(true);
        txtHoraServicio.setEditable(true);
        txtLugarServicio.setEditable(true);
        txtTelefonoContacto.setEditable(true);
        cmbCodigoEmpresa.setEditable(false);
    }
    
    public void limpiarControles(){
        txtCodigoServicio.setText("");
        txtTipoServicio.setText("");
        txtHoraServicio.setText("");
        txtLugarServicio.setText("");
        txtTelefonoContacto.setText("");
        cmbCodigoEmpresa.getSelectionModel().clearSelection();        
    }
    

    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    
    public void ventanaEmpresas(){
        escenarioPrincipal.ventanaEmpresas();
    }
    
    
    
}
