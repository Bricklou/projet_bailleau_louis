# Mise en place du backend à partir du [premier HOWTO](./HOWTO.md)

## Mise en place du projet

Pour commencer, créez le projet backend. Vous pouvez utiliser la stack que vous souhaitez, pour ma part, je vais utiliser [AdonisJS](https://adonisjs.com) :

```sh
# Il est possible que vous ayez déjà un dossier "backend" de présent,
# supprimez le avant d'effectuer cette commande
npm create adonisjs backend
```

Vous devrez voir le menu suivant apparaitre. Sélectionner l'option comme ci-dessous :

![Créer un projet AdonisJS](.github/docs/create-adonis.png)

Maintenant, dans le backend, installez le paquet suivants :

```sh
# Ce paquet est utilisé pour la validation des données
# Doc: https://vinejs.dev/docs/introduction
node ace add vinejs
```

## Configuration

### Docker

Dans le fichier `Dockerfile`, vous allez devoir activer l'ajout du backend Adonis. Dans l'ensemble, cela vous n'avez besoin que de décommenter les lignes déjà présente comme suit :

![Reconfiguration du Dockerfile](.github/docs/reconfigure-docker.png)

Ajoutez aussi quelques variables d'environnement par défaut :

![Reconfiguration du DockerFile (bis)](.github/docs/reconfigure-docker2.png)

### Nginx

Dans le fichier `docker/nginx.conf`, changez juste la configuration comme suit :

![Reconfiguration de Nginx](.github/docs/reconfigure-nginx.png)

### supervisord

Dans le fichier `docker/supervisord.conf`, décommentez toute la partie "backend" déjà présente

## Ajout des fichiers manquant

Pour finaliser l'installation, il ne vous manque que quelques fichiers lié au token JWT et le middleware lié.

Ces derniers sont situés dans :

- `backend/app/middlewares/jwt_middleware.ts`
- `backend/app/services/jwt_service.ts`
- `backend/app/kernel.ts`
- `backend/types/request.ts`

N'oubliez pas d'installer les modules `jsonwebtoken` et `@types/jsonwebtoken` avec NPM.
