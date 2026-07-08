import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { NgModule, isDevMode } from '@angular/core'
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core'

const uri = 'https://corsproxy.io/?https://dropmail.me/api/graphql/af_AQVqTpd1pV7-W-bQRsu3yBCrcY0LwI5kHakglUXO';

export function createApollo(httpLink: HttpLink): ApolloClientOptions {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  }
}

@NgModule({
  providers: [
    Apollo,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
