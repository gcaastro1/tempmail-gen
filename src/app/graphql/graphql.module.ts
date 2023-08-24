import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { NgModule } from '@angular/core'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const uri =
  'https://cors-anywhere.herokuapp.com/https://dropmail.me/api/graphql/20230822ymQJn'

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
    credentials: '*',
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
