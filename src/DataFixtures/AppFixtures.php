<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Invoice;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $faker = Factory::create('fr_FR');

        for ($c = 0; $c < 30; $c ++) {
            $customer = new Customer();
            $customer->setFirstName($faker->firstName());
            $customer->setLastName($faker->lastName);
            $customer->setCompagny($faker->company);
            $customer->setEmail($faker->email);

            $manager->persist($customer);
            for ($i = 0; $i < mt_rand(3, 10); $i++){
                $invoice = new Invoice();
                $invoice->setAmount($faker->randomFloat(2, 250, 5000));
                $invoice->setSentAT($faker->dateTimeBetween('-6 months'));
                $invoice->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']));
                $invoice->setCustomer($customer);

                $manager->persist($invoice);
            }
        }

        $manager->flush();
    }
}
