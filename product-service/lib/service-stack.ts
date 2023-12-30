import { Duration } from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import { join } from 'path'
import { ServiceInterface } from './serviceInterface'

interface ServiceProps {
  bucket: string
}

export class ServiceStack extends Construct {
  public readonly services: ServiceInterface

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id)

    const funcProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ['aws-sdk'],
      },
      environment: {
        BUCKET_NAME: props.bucket,
      },
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(10),
    }

    this.services = {
      // products
      createProduct: this.createHandler(funcProps, 'createProduct'),
      editProduct: this.createHandler(funcProps, 'editProduct'),
      getProducts: this.createHandler(funcProps, 'getProducts'),
      getSellerProducts: this.createHandler(funcProps, 'getSellerProducts'),
      getProduct: this.createHandler(funcProps, 'getProduct'),
      deleteProduct: this.createHandler(funcProps, 'deleteProduct'),

      // categories
      createCategory: this.createHandler(funcProps, 'createCategory'),
      editCategory: this.createHandler(funcProps, 'editCategory'),
      getCategories: this.createHandler(funcProps, 'getCategories'),
      getCategory: this.createHandler(funcProps, 'getCategory'),
      deleteCategory: this.createHandler(funcProps, 'deleteCategory'),

      // deals
      createDeals: this.createHandler(funcProps, 'createDeals'),

      // images
      imageUploader: this.createHandler(funcProps, 'imageUploader'),

      // message queue
      messageQueueHandler: this.createHandler(funcProps, 'messageQueueHandler'),
    }
  }

  createHandler(props: NodejsFunctionProps, handler: string): NodejsFunction {
    return new NodejsFunction(this, handler, {
      entry: join(__dirname, '/../src/handlers/index.ts'),
      handler: handler,
      ...props,
    })
  }
}
