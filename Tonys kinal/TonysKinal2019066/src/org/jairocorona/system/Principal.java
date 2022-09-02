
package org.jairocorona.system;


import java.io.InputStream;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.fxml.JavaFXBuilderFactory;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import org.jairocorona.controller.EmpleadoController;
import org.jairocorona.controller.EmpresaController;
import org.jairocorona.controller.MenuPrincipalController;
import org.jairocorona.controller.PresupuestoController;
import org.jairocorona.controller.ProgramadorController;
import org.jairocorona.controller.ServicioController;
import org.jairocorona.controller.TipoEmpleadoController;


public class Principal extends Application {
    private Stage escenarioPrincipal;
    private Scene escena;
    private final String Paquete_Vista = "/org/jairocorona/view/";
    
    
    @Override
    public void start(Stage escenarioPrincipal) throws Exception  {
       this.escenarioPrincipal = escenarioPrincipal;
       this.escenarioPrincipal.setTitle("Tony's Kinal App");
       escenarioPrincipal.getIcons().add(new Image("/org/jairocorona/image/Portada Tonys.png"));
       //Parent root = FXMLLoader.load(getClass().getResource("/org/jairocorona/view/MenuPrincipalView.fxml"));
      // Scene escena = new Scene(root);
       //escenarioPrincipal.setScene(escena);
       menuPrincipal();
       escenarioPrincipal.show();      
    }
    
    public void menuPrincipal(){
        try{
            MenuPrincipalController menuPrincipal = (MenuPrincipalController) cambiarEscena("MenuPrincipalView.fxml",536,828);
            menuPrincipal.setEscenarioPrincipal(this);
        }catch(Exception e ){
            e.printStackTrace();
        }          
    }
    
    public void ventanaProgramador(){
        try{
            ProgramadorController programador = (ProgramadorController) cambiarEscena("AcercadeView.fxml",412,558);
            programador.setEscenarioPrincipal(this);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
   public void ventanaEmpresas(){
       try{
           EmpresaController empresaController = (EmpresaController) cambiarEscena("EmpresaView.fxml",915,695);
           empresaController.setEscenarioPrincipal(this);
       }catch(Exception e){
           e.printStackTrace();
       }
   }
   
   public void ventanaPresupuestos(){
       try{
           PresupuestoController presupuesto = (PresupuestoController)cambiarEscena("PresupuestosView.fxml",887,658);
           presupuesto.setEscenarioPrincipal(this);
       }catch(Exception e){
           e.printStackTrace();
       }
   }
   
   public void ventanaTipoEmpleados(){
       try{
           TipoEmpleadoController tipoEmpleado = (TipoEmpleadoController)cambiarEscena("TipoEmpleadoView.fxml",774,567);
           tipoEmpleado.setEscenarioPrincipal(this);
       }catch(Exception e){
           e.printStackTrace();
       }
   }
   
   public void ventanaEmpleados(){
       try{
           EmpleadoController empleado = (EmpleadoController)cambiarEscena("EmpleadoView.fxml",1094,628);
           empleado.setEscenarioPrincipal(this);
       }catch(Exception e){
           e.printStackTrace();
       }
   }
   
   public void ventanaServicios(){
       try{
           ServicioController servicios = (ServicioController)cambiarEscena("ServiciosView.fxml",925,578);
           servicios.setEscenarioPrincipal(this);
       }catch(Exception e){
           e.printStackTrace();
       }
   }

   
    public static void main(String[] args) {
        launch(args);
    }
    
    public Initializable cambiarEscena (String fxml,int ancho,int alto) throws Exception{
        Initializable resultado = null;
        FXMLLoader cargadorFXML = new FXMLLoader();
        InputStream archivo = Principal.class.getResourceAsStream(Paquete_Vista+fxml);
        cargadorFXML.setBuilderFactory(new JavaFXBuilderFactory());
        cargadorFXML.setLocation(Principal.class.getResource(Paquete_Vista+fxml));
        escena = new Scene((AnchorPane)cargadorFXML.load(archivo),ancho,alto);
        escenarioPrincipal.setScene(escena);
        escenarioPrincipal.sizeToScene();
        resultado = (Initializable)cargadorFXML.getController();
        return resultado; 
        
    }


}
