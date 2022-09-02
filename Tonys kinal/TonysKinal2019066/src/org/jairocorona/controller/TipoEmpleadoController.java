package org.jairocorona.controller;

import java.net.URL;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javax.swing.JOptionPane;
import org.jairocorona.bean.TipoEmpleado;
import org.jairocorona.db.Conexion;
import org.jairocorona.system.Principal;


public class TipoEmpleadoController implements Initializable {
    private enum operaciones{NUEVO,GUARDAR,ELIMINAR,EDITAR,ACTUALIZAR,CANCELAR,NINGUNO};
    private Principal escenarioPrincipal;
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private ObservableList <TipoEmpleado> listaTipoEmpleado;
    @FXML private TextField txtCodigoTipoEmpleado;
    @FXML private TextField txtDescripcionTipoEmpleado;
    @FXML private TableView tblTipoEmpleado;
    @FXML private TableColumn colCodigoTipoEmpleado;
    @FXML private TableColumn colDescripcionTipoEmpleado;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
      
    @Override
    public void initialize(URL location, ResourceBundle resources) {
        cargarDatos();
    }
    
    public void cargarDatos(){
        tblTipoEmpleado.setItems(getTipoEmpleado());
        colCodigoTipoEmpleado.setCellValueFactory(new PropertyValueFactory<TipoEmpleado, Integer>("codigoTipoEmpleado"));
        colDescripcionTipoEmpleado.setCellValueFactory(new PropertyValueFactory<TipoEmpleado, String>("descripcion"));
    }
    
    public void seleccionarElemento(){
     txtCodigoTipoEmpleado.setText(String.valueOf(((TipoEmpleado)tblTipoEmpleado.getSelectionModel().getSelectedItem()).getCodigoTipoEmpleado()));
     txtDescripcionTipoEmpleado.setText(((TipoEmpleado)tblTipoEmpleado.getSelectionModel().getSelectedItem()).getDescripcion());
    }

    public TipoEmpleado buscaTipoEmpleado(int codigoTipoEmpleado){
        TipoEmpleado resultado = null;
        try{
           PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_BuscarTipoEmpleado(?)}");
           procedimiento.setInt(1, codigoTipoEmpleado);
           ResultSet registro = procedimiento.executeQuery();
           while(registro.next()){
               resultado = new TipoEmpleado(
                           registro.getInt("codigoTipoEmpleado"),
                           registro.getString("descripcion"));
           }
        }catch(Exception e){
            e.printStackTrace();
        }
        return resultado;
    }
    
    public  ObservableList <TipoEmpleado> getTipoEmpleado(){
        ArrayList<TipoEmpleado> lista = new ArrayList<TipoEmpleado>();
        try{
            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ListarTipoEmpleado}");
            ResultSet resultado = procedimiento.executeQuery();
            while(resultado.next()){
                lista.add(new TipoEmpleado( resultado.getInt("codigoTipoEmpleado"),
                                            resultado.getString("descripcion")));
            }           
        }catch(Exception e){
            e.printStackTrace();
        }
        return listaTipoEmpleado = FXCollections.observableArrayList(lista);
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
             if(txtDescripcionTipoEmpleado.getText().equals("")){
                 JOptionPane.showMessageDialog(null, "Ingrese una Descripcion");
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
     TipoEmpleado registro = new TipoEmpleado();
     //registro.setCodigoEmpresa(Integer.parseInt(txtCodigoEmpresa.getText()));
     registro.setDescripcion(txtDescripcionTipoEmpleado.getText());
     try{
         PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_AgregarTipoEmpleado(?)}");
         procedimiento.setString(1, registro.getDescripcion());
         procedimiento.execute();
         listaTipoEmpleado.add(registro);
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
                if(tblTipoEmpleado.getSelectionModel().getSelectedItem() != null){
                    int respuesta = JOptionPane.showConfirmDialog(null,"¿Esta seguro de eliminar? \n Eliminara los datos que esten unido con los empleados" ,
                            "Eliminar Tipo Empleado",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
                    if(respuesta == JOptionPane.YES_OPTION){
                        try{
                            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EliminarTipoEmpleado(?)}");
                            procedimiento.setInt(1, ((TipoEmpleado)tblTipoEmpleado.getSelectionModel().getSelectedItem()).getCodigoTipoEmpleado());
                            procedimiento.execute();
                            listaTipoEmpleado.remove(tblTipoEmpleado.getSelectionModel().getSelectedIndex());
                        }catch(Exception e){
                            e.printStackTrace();
                        }
                    }
                }else{
                    JOptionPane.showMessageDialog(null,"Seleccione un elemento");
                }             
     }
 }
 
  public void editar(){
    switch(tipoDeOperacion){
        case NINGUNO:
           if(tblTipoEmpleado.getSelectionModel().getSelectedItem() != null){   
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
         PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ActualizarTipoEmpleado(?,?)}");
         TipoEmpleado registro =(TipoEmpleado)tblTipoEmpleado.getSelectionModel().getSelectedItem();
         registro.setDescripcion(txtDescripcionTipoEmpleado.getText());
         procedimiento.setInt(1, registro.getCodigoTipoEmpleado());
         procedimiento.setString(2, registro.getDescripcion());
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
        txtCodigoTipoEmpleado.setEditable(false);
        txtDescripcionTipoEmpleado.setEditable(false);
    }

    public void activarControles(){
        txtCodigoTipoEmpleado.setEditable(false);
        txtDescripcionTipoEmpleado.setEditable(true);
    }
    
    public void limpiarControles(){
        txtCodigoTipoEmpleado.setText("");
        txtDescripcionTipoEmpleado.setText("");
    }   
    
    public Principal getEscenarioPrincipal() {
        return escenarioPrincipal;
    }

    public void setEscenarioPrincipal(Principal escenarioPrincipal) {
        this.escenarioPrincipal = escenarioPrincipal;
    }
    
    public void menuPrincipal(){
        escenarioPrincipal.menuPrincipal();
    }
    
    public void ventanaEmpleados(){
        escenarioPrincipal.ventanaEmpleados();
    }

}
