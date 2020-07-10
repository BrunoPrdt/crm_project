<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    const name = '__Host-JWT';

    /**
     * @Route("/", name="app")
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $name = self::name;
        if ($request->cookies->get($name)){
            $token = $request->cookies->get($name);
            return $this->render('app/index.html.twig', [
                'controller_name' => 'AppController',
                'token' => $token,
            ]);
        }
        else{
            return $this->render('app/index.html.twig', [
                'controller_name' => 'AppController',
            ]);
        }
    }

    /**
     * @Route("/api/logout", name="app_logout")
     * @param Request $request
     * @return Response
     */
    public function logout(Request $request)
    {
        $name = self::name;
        if ($request->cookies->get($name)){
            $response = new Response();
            $response->headers->setCookie(
                new Cookie(
                    '__Host-JWT', // Cookie name, should be the same as in config/packages/lexik_jwt_authentication.yaml.
                    '', // cookie value
                    1, // expiration
                    '/', // path
                    null, // domain, null means that Symfony will generate it on its own.
                    true, // secure
                    true, // httpOnly
                    false, // raw
                    null // same-site parameter, can be 'lax' or 'strict'.
                )
            );
            return $response;
        }
        return ;
    }
}
