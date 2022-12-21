//const fs = require('fs')
import fs from 'fs'

class ProductManager {

    constructor(path) {
        this.path = path

        if(fs.existsSync(this.path)){
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
          } else {
            this.products = []
          }
    }
    
    async addProduct(title,description,price,thumbnail,code,stock){
        
        const prod = {title,description,price,thumbnail,code,stock};

        if (this.products.length === 0) {
            prod["id"] = 1;
        } else {
            prod["id"] = this.products[this.products.length - 1]["id"] + 1;
        }

        this.products.push(prod)

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Producto agregado')
        } catch(error) {
            console.log('Error al agregar producto: ', error)
        }
    }


    getProducts(){
        return this.products
    }

    getProductById(id) {
        try {
          return this.products.filter(prod => prod.id === id)
        } catch (error) {
          return "No existe el producto"
        }
    }


    async updateProduct(id, product){
        try {
          const oldProduct = this.products.find((product) => product.id === id)
          const index = this.products.findIndex((product) => product.id === id)
  
          if(index !== -1) {
            const newProduct = {...oldProduct, ...product }
            this.products[index] = newProduct
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Producto actualizado')
          }
        } catch(error) {
          console.log('Error en la actualizacion: ', error)
        }
    }


    async deleteProduct(id) {
        try {
          const product = this.products.findIndex((prod) => prod.id === id)
  
          if(product !== -1) {
            this.products.splice(product, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            console.log('Producto eliminado')
          }
          else {
            console.log('Elemento no encontrado')
          }
        } catch (error) {
          console.log('Error al borrar producto:', error)
        }
      }

}

///////////INICIO PRUEBAS - Servidores
export default new ProductManager("./Productos.json");


///////////INICIO PRUEBAS - Manejo de archivos
/*
const file = new ProductManager("./Productos.json");

//console.log(file.getProducts());

file.addProduct('producto prueba 1', 'Este es un producto prueba 1', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 2', 'Este es un producto prueba 2', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 3', 'Este es un producto prueba 3', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 4', 'Este es un producto prueba 4', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 5', 'Este es un producto prueba 5', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 6', 'Este es un producto prueba 6', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 7', 'Este es un producto prueba 7', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 8', 'Este es un producto prueba 8', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 9', 'Este es un producto prueba 9', 200, 'Sin imagen', 'abc123', 25);
file.addProduct('producto prueba 10', 'Este es un producto prueba 10', 200, 'Sin imagen', 'abc123', 25);

 console.log(file.getProducts());

 console.log(file.getProductById(1));

 //Para el update, actualizo todo el objeto
 file.updateProduct(3, {    title: 'otro producto prueba',
                            description: 'Este es un producto prueba',
                            price: 100,
                            thumbnail: 'Sin imagen',
                            code: 'rrr123',
                            stock: 30 });


file.deleteProduct(1);
*/








