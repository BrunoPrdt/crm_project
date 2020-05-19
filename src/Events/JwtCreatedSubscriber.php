<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

/**
 * Class JwtCreatedSubscriber
 * @package App\Events
 */
class JwtCreatedSubscriber {

    /**
     * @param JWTCreatedEvent $event
     */
    public function updateJwtData(JWTCreatedEvent $event){

        $user = $event->getUser();
        $data = $event->getData();
        $data["firstName"] = $user->getFirstName();
        $data["lastName"] = $user->getLastName();

        $event->setData($data);
    }
}