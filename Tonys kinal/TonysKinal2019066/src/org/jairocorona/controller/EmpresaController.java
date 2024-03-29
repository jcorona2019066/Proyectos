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
import org.jairocorona.bean.Empresa;
import org.jairocorona.db.Conexion;
import org.jairocorona.system.Principal;

public class EmpresaController implements Initializable{
    private enum operaciones{NUEVO,GUARDAR,ELIMINAR,EDITAR,ACTUALIZAR,CANCELAR,NINGUNO};
    private Principal escenarioPrincipal;
    private operaciones tipoDeOperacion = operaciones.NINGUNO;
    private ObservableList <Empresa> listaEmpresa;
    @FXML private TextField txtCodigoEmpresa;
    @FXML private TextField txtNombreEmpresa;
    @FXML private TextField txtDireccionEmpresa;
    @FXML private TextField txtTelefono;
    @FXML private TableView tblEmpresas;
    @FXML private TableColumn colCodigoEmpresa;
    @FXML private TableColumn colNombreEmpresa;
    @FXML private TableColumn colDireccionEmpresa;
    @FXML private TableColumn colTelefonoEmpresa;
    @FXML private Button btnNuevo;
    @FXML private Button btnEliminar;
    @FXML private Button btnEditar;
    @FXML private Button btnReporte;
    
    @Override
    public void initialize(URL location, ResourceBundle resources) {
       cargarDatos();
    }
    
    public void cargarDatos(){
        tblEmpresas.setItems(getEmpresa());
        colCodigoEmpresa.setCellValueFactory(new PropertyValueFactory<Empresa, Integer>("codigoEmpresa"));
        colNombreEmpresa.setCellValueFactory(new PropertyValueFactory<Empresa, String>("nombreEmpresa"));
        colDireccionEmpresa.setCellValueFactory(new PropertyValueFactory<Empresa, String>("direccion"));
        colTelefonoEmpresa.setCellValueFactory(new PropertyValueFactory<Empresa, String>("telefono"));
    }
    
    public void seleccionarElemento(){
     txtCodigoEmpresa.setText(String.valueOf(((Empresa)tblEmpresas.getSelectionModel().getSelectedItem()).getCodigoEmpresa()));
     txtNombreEmpresa.setText(((Empresa)tblEmpresas.getSelectionModel().getSelectedItem()).getNombreEmpresa());
     txtDireccionEmpresa.setText(((Empresa)tblEmpresas.getSelectionModel().getSelectedItem()).getDireccion());
     txtTelefono.setText(((Empresa)tblEmpresas.getSelectionModel().getSelectedItem()).getTelefono());
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
            resultado = new Empresa(
                        registro.getInt("codigoEmpresa"),
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
             if(txtNombreEmpresa.getText().equals("")){
                JOptionPane.showMessageDialog(null, "Ingrese un nombre");
             }else if(txtDireccionEmpresa.getText().equals("")){
                JOptionPane.showMessageDialog(null, "Ingrese una direccion"); 
             }else if(txtTelefono.getText().equals("")){
                JOptionPane.showMessageDialog(null, "Ingrese un telefono");
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
     Empresa registro = new Empresa();
     //registro.setCodigoEmpresa(Integer.parseInt(txtCodigoEmpresa.getText()));
     registro.setNombreEmpresa(txtNombreEmpresa.getText());
     registro.setDireccion(txtDireccionEmpresa.getText());
     registro.setTelefono(txtTelefono.getText());
     try{
         PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_AgregarEmpresas(?,?,?)}");
         procedimiento.setString(1, registro.getNombreEmpresa());
         procedimiento.setString(2, registro.getDireccion());
         procedimiento.setString(3, registro.getTelefono());
         procedimiento.execute();
         listaEmpresa.add(registro);
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
                if(tblEmpresas.getSelectionModel().getSelectedItem() != null){
                    int respuesta = JOptionPane.showConfirmDialog(null,"¿Esta seguro de eliminar? \n Eliminara los datos que esten unidos a presupuesto",
                            "Eliminar Empresa",JOptionPane.YES_NO_OPTION,JOptionPane.QUESTION_MESSAGE);
                    if(respuesta == JOptionPane.YES_OPTION){
                        try{
                            PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_EliminarEmpresas(?)}");
                            procedimiento.setInt(1, ((Empresa)tblEmpresas.getSelectionModel().getSelectedItem()).getCodigoEmpresa());
                            procedimiento.execute();
                            listaEmpresa.remove(tblEmpresas.getSelectionModel().getSelectedIndex());
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
           if(tblEmpresas.getSelectionModel().getSelectedItem() != null){   
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
         PreparedStatement procedimiento = Conexion.getInstance().getConexion().prepareCall("{call sp_ActualizarEmpresas(?,?,?,?)}");
         Empresa registro =(Empresa)tblEmpresas.getSelectionModel().getSelectedItem();
         registro.setNombreEmpresa(txtNombreEmpresa.getText());
         registro.setDireccion(txtDireccionEmpresa.getText());
         registro.setTelefono(txtTelefono.getText());
         procedimiento.setInt(1, registro.getCodigoEmpresa());
         procedimiento.setString(2, registro.getNombreEmpresa());
         procedimiento.setString(3, registro.getDireccion());
         procedimiento.setString(4,registro.getTelefono());
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
    txtCodigoEmpresa.setEditable(false);
    txtNombreEmpresa.setEditable(false);
    txtDireccionEmpresa.setEditable(false);
    txtTelefono.setEditable(false);
}

public void activarControles(){
    txtCodigoEmpresa.setEditable(false);
    txtNombreEmpresa.setEditable(true);
    txtDireccionEmpresa.setEditable(true);
    txtTelefono.setEditable(true);
}
    
public void limpiarControles(){
    txtCodigoEmpresa.setText("");
    txtNombreEmpresa.setText("");
    txtDireccionEmpresa.setText("");
    txtTelefono.setText("");
    
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
    
    public void ventanaPresupuestos(){
        escenarioPrincipal.ventanaPresupuestos();
    }
    
    public void ventanaServicios(){
        escenarioPrincipal.ventanaServicios();
    }
    
}


